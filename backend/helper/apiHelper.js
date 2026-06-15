//User vanthu product search panna use aagum search,filter,pagination
class APIHelper {
  constructor(query, queryStr) {
    this.query = query; //=>MongoDB execution query
    this.queryStr = queryStr; //=>query string from URL
  }
  //http://localhost:8000/api/v1/products?keyword=Samsung
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //=>regular expression
            $options: "i", //=>ignore case sensitive
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //http://localhost:8000/api/v1/products?keyword=Samsung&category=Stationary&page=1&limit=5
  filter() {
    const querycopy = { ...this.queryStr }; //Query string la irukura ella fields um copy pannudhu
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete querycopy[key]);
    this.query = this.query.find(querycopy);
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default APIHelper;

/*
search() method explanation:
db.product.find({}) =>search la athum kudukalana all products varum
db.products.find({
  name: {
  $regex: "Samsung",
  $options: "i"
  },
}) =>eppadi kudutha search la enna search panromo athu mattum varum

filter() method explanation:
db.products.find({
  name: {
  $regex: "Samsung",
  $options: "i"
  },
  category:"Mobile"
})

db.products.find({
  category:"Mobile"
})
*/
