const { faker } = require("@faker-js/faker/locale/fr");
const fs = require("node:fs/promises");

// script de génération des objets produist

// configuration
const nbProducts = 50;
const nbImagesPerProduct = 4;
const pictureWidth = 295;
const pictureHeight = 367;
const pictureCategory = "pill";
const outputFile = "productPharmacy.json";

// end configuration

const listProduct = [];

function generatePictures(width, height, category) {
  const imagesProduct = [];
  for (let i = 0; i < nbImagesPerProduct; i++) {
    imagesProduct.push(
      faker.image.urlLoremFlickr({
        category: category,
        width: width,
        height: height,
      })
    );
  }
  return imagesProduct;
}

for (let i = 0; i < nbProducts; i++) {
  // création de l'objet
  const product = {};
  product._id = faker.string.uuid();
  product.name = faker.commerce.productName();
  product.description = faker.commerce.productDescription();
  product.imagesUrl = generatePictures(
    pictureWidth,
    pictureHeight,
    pictureCategory
  );
  product.isDiscount = false;
  product.discountPercentage = faker.number.float({
    min: 1,
    max: 90,
    precision: 1,
  });
  product.price = faker.number.float({ min: 0.01, max: 100, precision: 0.01 });
  product.note = faker.number.int({ min: 1, max: 5 });

  // ajout du produit dans le tableau.
  listProduct.push(product);
}

// stringify data
const listProductStringify = JSON.stringify(listProduct);

// write in file
fs.appendFile(outputFile, listProductStringify);
