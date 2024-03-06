Dynamic Tabbed Browser
This project implements a dynamic tabbed browser interface using HTML, CSS, JavaScript, and jQuery. Users can create and close tabs, enter URLs to load content in iframes, and switch between tabs.

Features
1. Dynamic Tab Creation & Closing: Users can create new tabs with a "+" button and close individual tabs with a "x" button.
2. URL Input & Content Loading: Each new tab displays an input field for entering URLs. Pressing Enter loads the corresponding webpage content within an iframe.
3. Tab Switching: Users can switch between tabs by clicking on them.
4. Responsive UI.


Design Pattern:
This project uses the MVC (Model-View-Controller) design pattern for separation of concerns:

Model: Handles data management, such as storing opened tab information (URLs, iframe content).
Controller: Handles user interactions like creating tabs, closing tabs, submitting URLs, and switching between tabs.
Note: Model and Controller is handled by the main.js file.
View: Renders the user interface elements (tabs, buttons, input fields, iframes).
1. View is Handled by the index.html and style.css files

Getting Started
1. Clone this repository.
2. Open the index.html file in a web browser.
3. Start exploring! Create new tabs, enter URLs, and switch between them.

Recorded Demo of the Assessment:
Refer this link: https://drive.google.com/file/d/17Vyf9T3QLvdkTwhgtTPInbPWen2IWUoF/view?usp=sharing
