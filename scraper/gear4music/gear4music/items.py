# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class Gear4MusicItem(scrapy.Item):
    # define the fields for your item here like:
    id = scrapy.Field()
    title = scrapy.Field()
    price = scrapy.Field()
    currency = scrapy.Field()
    url = scrapy.Field()
    images = scrapy.Field()
    keywords = scrapy.Field()
    description = scrapy.Field()
    key_features = scrapy.Field()
    specs = scrapy.Field()
    variations = scrapy.Field()
    brand = scrapy.Field()
    direct_category = scrapy.Field()
    category = scrapy.Field()
    indirect_category = scrapy.Field()
    color = scrapy.Field()

    pass
