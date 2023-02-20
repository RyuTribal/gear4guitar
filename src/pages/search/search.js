import React from "react";
import "./search.css";
import {
  getSearchFeed,
  getTotalResults,
  getCategoryPath,
  getCategories,
  getCategoryBrandsColors,
} from "../../api_calls/search";
import withRouter from "../../components/routes";
import { Grid, Pagination, Box, PaginationItem } from "@mui/material";
import Header from "./components/Header";
import Results from "./components/Results";
import { Link } from "react-router-dom";
import FilterDrawer from "./components/FilterDrawer";

const order_by = [
  { name: "Price: High to Low", value: "price_desc" },
  { name: "Price: Low to High", value: "price_asc" },
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_results: null,
      total_results: 0,
      categories: [],
      price_max: null,
      price_min: null,
      brands: [],
      colors: [],
      checked_brands: [],
      checked_colors: [],
      search_string: null,
      offset: 0,
      total_pages: 0,
      filterDrawerOpen: false,
      trail: [],
      order_by_index: 0,
    };
  }

  componentDidMount = async () => {
    const search = this.props.router.location.search;
    const sp = new URLSearchParams(search);
    let categories = [];
    if (this.props.router.params.category) {
      categories = await this.getCategoryPath();
    }
    this.setState(
      {
        price_max: parseFloat(sp.get("price_max")),
        price_min: parseFloat(sp.get("price_min")),
        checked_brands: sp.get("brands") ? sp.get("brands").split(",") : [],
        categories: categories,
        checked_colors: sp.get("colors") ? sp.get("colors").split(",") : [],
        search_string: sp.get("query"),
        offset: sp.get("page") ? (sp.get("page") - 1) * 15 : 0,
      },
      () => {
        this.getProducts();
        this.getTotalResults();
        this.getCategories();
        this.getCategoryBrandsColors();
      }
    );
  };

  componentDidUpdate = async (prevProps) => {
    if (
      this.props.router.location.search !== prevProps.router.location.search ||
      prevProps.router.params.category !== this.props.router.params.category
    ) {
      const search = this.props.router.location.search;
      const sp = new URLSearchParams(search);
      let categories = [];
      if (this.props.router.params.category) {
        categories = await this.getCategoryPath();
      }
      this.setState(
        {
          price_max: parseFloat(sp.get("price_max")),
          price_min: parseFloat(sp.get("price_min")),
          checked_brands: sp.get("brands") ? sp.get("brands").split(",") : [],
          categories: categories,
          checked_colors: sp.get("colors") ? sp.get("colors").split(",") : [],
          search_string: sp.get("query"),
          offset: sp.get("page") ? (sp.get("page") - 1) * 15 : 0,
        },
        () => {
          this.getProducts();
          this.getTotalResults();
          this.getCategories();
          this.getCategoryBrandsColors();
        }
      );
    }
  };

  getCategoryPath = async () => {
    let res_categories = await getCategoryPath(
      this.props.router.params.category
    );
    if (res_categories.status === 200) {
      return res_categories.data;
    }
  };

  getCategoryBrandsColors = async () => {
    let res_brands = await getCategoryBrandsColors(
      this.props.router.params.category
    );
    if (res_brands.status === 200) {
      this.setState({
        brands: res_brands.data[0].distinct_brands,
        colors: res_brands.data[0].distinct_colors,
      });
    }
  };

  getCategories = async () => {
    let res_categories = await getCategories(this.props.router.params.category);
    if (res_categories.status === 200) {
      this.setState({ trail: res_categories.data });
    }
  };

  getProducts = async () => {
    let res_products = await getSearchFeed(
      this.state.search_string,
      {
        price_max: this.state.price_max,
        price_min: this.state.price_min,
        categories: this.state.categories,
        brands: this.state.checked_brands,
        colors: this.state.checked_colors,
        order_by: order_by[this.state.order_by_index].value,
      },
      this.state.offset
    );
    if (res_products.status === 200) {
      this.setState({ search_results: res_products.data });
    }
  };

  getTotalResults = async () => {
    let res_total = await getTotalResults(this.state.search_string, {
      categories: this.state.categories,
      price_max: this.state.price_max,
      price_min: this.state.price_min,
      brands: this.state.checked_brands,
      colors: this.state.checked_colors,
    });

    if (res_total.status === 200) {
      let total_pages = Math.ceil(res_total.data[0].total_results / 15);
      this.setState({
        total_results: res_total.data[0].total_results,
        total_pages: total_pages,
      });
    }
  };

  buildSearchUrl = (page) => {
    let url = `/search${
      this.props.router.params.category
        ? "/" + this.props.router.params.category
        : ""
    }?`;
    if (page) {
      url += `page=${page}&`;
    }
    if (this.state.price_max && this.state.price_max !== 0) {
      url += `price_max=${this.state.price_max}&`;
    }
    if (this.state.price_min && this.state.price_min !== 0) {
      url += `price_min=${this.state.price_min}&`;
    }
    if (this.state.checked_brands && this.state.checked_brands.length > 0) {
      url += `brands=${this.state.checked_brands}&`;
    }
    if (this.state.checked_colors && this.state.checked_colors.length > 0) {
      url += `colors=${this.state.checked_colors}&`;
    }
    if (this.state.search_string && this.state.search_string !== "" && this.state.search_string !== " ") {
      url += `query=${this.state.search_string}&`;
    }
    url = url.slice(0, -1);
    return url;
  };

  openFilterDrawer = async () => {
    this.setState({ filterDrawerOpen: true });
  };

  onFilterChange = (data) => {
    this.setState(
      {
        checked_colors: data.colors,
        checked_brands: data.brands,
        price_min: data.price_min,
        price_max: data.price_max,
        filterDrawerOpen: false,
      },
      () => {
        this.props.router.navigate(this.buildSearchUrl(1));
      }
    );
  };

  onChangeOrderBy = (index) => {
    this.setState({ order_by_index: index }, () => {
      this.getProducts();
    });
  };

  render() {
    return (
      <Box
        sx={{
          flexGrow: 1,
          paddingTop: 5,
          backgroundColor: "secondary.main",
          minHeight: "100vh",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Header
              search_params={{
                search_string: this.state.search_string,
                brand: this.state.brand,
              }}
              categories={this.state.categories}
              matches={this.state.total_results}
              openFilterDrawer={this.openFilterDrawer}
              trail={this.state.trail}
              order_by={order_by}
              onChangeOrderBy={(index) => this.onChangeOrderBy(index)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FilterDrawer
              open={this.state.filterDrawerOpen}
              onClose={() => this.setState({ filterDrawerOpen: false })}
              onOpen={() => this.setState({ filterDrawerOpen: true })}
              brands={this.state.brands}
              colors={this.state.colors}
              price_min={this.state.price_min}
              price_max={this.state.price_max}
              checked_brands={this.state.checked_brands}
              checked_colors={this.state.checked_colors}
              onFilterChange={(data) => this.onFilterChange(data)}
            />
          </Grid>
          <Grid item container spacing={2} xs={12} md={9}>
            <Results
              products={this.state.search_results}
              total_pages={this.state.total_pages}
            />
          </Grid>
        </Grid>
        {this.state.total_pages > 1 && (
          <Pagination
            variant="outlined"
            count={this.state.total_pages}
            color="primary"
            page={this.state.offset / 15 + 1}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={this.buildSearchUrl(item.page)}
                {...item}
              />
            )}
          />
        )}
      </Box>
    );
  }
}

export default withRouter(Search);
