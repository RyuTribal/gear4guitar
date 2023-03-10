# -*- coding: utf-8 -*-

"""
Code contains the default spider, crawling
through links
"""


from scrapy import Request
from scrapy.spiders import SitemapSpider, Rule
from scrapy.linkextractors.lxmlhtml import LxmlLinkExtractor
from ..items import Gear4MusicItem
from bs4 import BeautifulSoup
import json
import js2xml
import lxml.etree
from parsel import Selector
import re


class MenuProductSpider(SitemapSpider):
    name = "guitar_spider"
    allowed_domains = ["gear4music.com"]
    sitemap_urls = [
        "https://www.gear4music.com/sitemaps/com/en/sitemap-guitar_bass.xml"]

    def __init__(self, url="", **kwargs):

        super().__init__(**kwargs)

    def parse(self, response):
        add_to_basket_btn = response.xpath(
            "//a[contains(@class, 'add-to-basket-button')]").extract_first()
        if add_to_basket_btn:
            html = response.text
            javascript = response.css('script::text').getall()
            product_list_json = None
            for js in javascript:
                js = js[27:]
                js = js[:-1]
                try:
                    product_list_json = json.loads(js)
                except:
                    pass

            soup = BeautifulSoup(html, "html.parser")
            item = Gear4MusicItem()
            json_ld = json.loads(response.xpath(
                '//script[@type="application/ld+json"]//text()').extract_first())
            item['id'] = json_ld["@graph"][1]["productID"]
            item["url"] = response.url
            item['title'] = json_ld["@graph"][1]["name"]
            item['price'] = json_ld["@graph"][1]["offers"]["price"]
            item["currency"] = json_ld["@graph"][1]["offers"]["priceCurrency"]
            item["images"] = json_ld["@graph"][1]["image"]
            item["keywords"] = response.xpath(
                "//meta[@name='keywords']/@content").extract_first().split(',')
            key_features_list = list(soup.find_all(
                "div", {"class": "quick-info"})[-2].find_all("li"))

            key_features = []
            
            try:
                item["color"] = soup.find("span", {"class": "selected-colour"}).string
            except:
                pass
            for feature in key_features_list:
                key_features.append(feature.string)

            item["key_features"] = key_features
            item["description"] = json_ld["@graph"][1]["description"]

            item["brand"] = json_ld["@graph"][1]["brand"]["name"]
            try:
                item["direct_category"] = json_ld["@graph"][2]["itemListElement"][0]["item"]["name"]
            except:
                pass
            try:
                item["category"] = json_ld["@graph"][2]["itemListElement"][1]["item"]["name"]
            except:
                pass
            try:
                item["indirect_category"] = json_ld["@graph"][2]["itemListElement"][2]["item"]["name"]
            except:
                pass

            full_desc = soup.find_all("div", {"class": "slide"})[0]
            divs = full_desc.select("div#trustpilot-service-reviews")
            if len(divs) != 0:
                divs[0].decompose()
            full_desc.find_all("h2", {"class": "section-title"})[0].decompose()
            full_desc.find_all("a", {"class": "opener"})[0].decompose()

            spec_features = []

            desc_ul_list = list(full_desc.find_all("ul"))
            for ul in desc_ul_list:
                spec_feature = {}
                spec_feature["title"] = ul.previous_sibling.string
                if spec_feature["title"] == "\n" or spec_feature["title"] == " ":
                    spec_feature["title"] = ul.previous_sibling.previous_sibling.string

                spec_feature["content"] = []

                for li in ul.find_all("li"):
                    spec_feature["content"].append(li.get_text())

                spec_features.append(spec_feature)

            item["specs"] = spec_features

            variations = []

            variation_div = soup.find("div", {"class": "variations-colour"})

            if (variation_div is None):
                variation_div = soup.find("div", {"class": "accessories-list"})
                if (variation_div is None):
                    self.logger.critical("No variations found")
                else:
                    variation_list = variation_div.find_all("li")
                    for variation in variation_list:
                        if (a_elem is None or a_elem['href'].split("/")[-1] == response.url.split("/")[-1]):
                            continue

                        variation = {}
                        title = a_elem.find("img")["alt"]
                        for product in product_list_json["products"]:
                            if product[1]["name"] == title:
                                variation["id"] = product[1]["id"]
                                variation["image"] = a_elem.find("img")['src']
                                variations.append(variation)
                            else:
                                continue
                        
            else:
                variation_list = variation_div.find_all("li")
                for variation in variation_list:
                    a_elem = variation.find("a")
                    if (a_elem is None or "javascript:void(0)" in a_elem['href']):
                        continue
                    variation = {}
                    title = a_elem['title']
                    for product in product_list_json["products"]:
                        if product[1]["name"] == title:
                            variation["id"] = product[1]["id"]
                            variation["image"] = a_elem.find("img")['src']
                            variations.append(variation)
                        else:
                            continue

            item["variations"] = variations

            yield item
        else:

            links = LxmlLinkExtractor(
                allow=self.allowed_paths).extract_links(response)

            for link in links:
                yield response.follow(link, callback=self.parse_obj)
