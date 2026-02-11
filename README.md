# GreatShop

This is a project for The Odin Project's React course demonstrating ability with [React Router](https://reactrouter.com/) and general SPA functionality, [Vitest](https://vitest.dev/) and [associated](https://testing-library.com/) [packages](https://github.com/testing-library/jest-dom), and [CSS Modules](https://github.com/css-modules/css-modules). It's essentially a sample of an e-commerce type shopping page, complete with a home page, a catalog, and a cart. There's obviously no purchasing so that's where it ends.

The incrementer (used both on the cards in the store page and on the items in the cart) is notable for actually containing a text field, not a number field; certain aspects of type="number" were implemented manually, but there was too much baggage associated with type="number" that made certain things very difficult to match the intended functionality. You can still use the up and down arrow keys on the keyboard to change numbers (within proper ranges) though.

With the exception of the error page, there is a universal sticky navbar that will hopefully make your life easier.

The picture on the home page is a stock photo from [Picsum](https://picsum.photos/). I don't intend to replace it.

All items in the shop are pulled from the [Fake Store API](https://fakestoreapi.com/). Check it out, as it may be helpful for your projects.

Certain icons come from the [Lucide](https://lucide.dev/) icon component library.

Project is &copy; Robert Eisenman, 2026