$(document).ready(function () {
  /**
   *
   *
   * MODEL SECTION STARTS
   *
   *
   */

  // Defining variables
  let counter = 0;
  let tabList = [];

  /**
   * MODEL SECTION ENDS
   */

  /**
   *
   *
   * CONTROLLER SECTION STARTS
   *
   *
   */

  // * Add Tab Fucntionality
  $("#add-button").click(function () {
    // This function creates new tab in the list.
    counter++;

    const tabValue = {
      tabId: counter,
      inputSearch: "",
      isActive: true,
    };

    // If tabList has already some tabs:
    if (tabList.length > 0) {
      const newTabList = tabList.map((tabObj) => {
        return {
          ...tabObj,
          isActive: false,
        };
      });
      tabList = newTabList;
    }

    tabList.push(tabValue);
    $("#search-iframe").attr("src", "https://www.bing.com/search?igu=1"); // setting iframe src on new tab
    renderTabs(tabList);
  });
  // * Tab switch handler and Tab close Fucntionality
  $(".tab-right-container")
    .on("click", ".tab", function () {
      // / Tab switch functionality
      const clickedListItem = $(this); // Get the clicked list item
      const clickedListItemId = clickedListItem.attr("id").split("-")[1]; // Get the ID of the clicked item

      tabList = tabList.map((tab) => {
        if (tab.tabId == clickedListItemId) {
          $("#search-iframe").attr(
            "src",
            tab.inputSearch.length > 0
              ? tab.inputSearch
              : "https://www.bing.com/search?igu=1"
          );
          return { ...tab, isActive: true };
        } else {
          return { ...tab, isActive: false };
        }
      });
      renderTabs(tabList); // paiting the web page
    })
    .on("click", ".tab-icon", function (event) {
      // Tab close Functionality

      const clickedListItem = $(this).closest(".tab");
      const removedItemId = clickedListItem.attr("id"); // Get the ID before removal

      const tabId = isString(removedItemId) && removedItemId.split("-"); // this will return array like ["tab","1"] if removedItemId is "tab-1"

      if (tabId[1]) {
        const foundTab = tabList.find((tab) => tab.tabId == tabId[1]); // find the tag with id
        if (foundTab?.isActive) {
          // here we will get the index of the tab and if its at zeroth index we will make 2nd tab active else we will make previous tab active.
          const indexOfTab = tabList.findIndex((tab) => tab.tabId == tabId[1]);
          if (indexOfTab === 0) {
            // If user closes first tab make second tab active and them remove the tab
            const updatedTabList = tabList.map((tab, index) => {
              if (index === 1) {
                $("#search-iframe").attr(
                  "src",
                  tab.inputSearch.length > 0
                    ? tab.inputSearch
                    : "https://www.bing.com/search?igu=1"
                ); // setting Iframe src
                return {
                  ...tab,
                  isActive: true,
                };
              } else {
                return {
                  ...tab,
                  isActive: false,
                };
              }
            });

            // NOTE: When There is only one tab in the tablist by filter function below we get a empty string.
            tabList = updatedTabList.filter((tab) => tab.tabId != tabId[1]);
          } else {
            const updatedTabList = tabList.map((tab, index) => {
              if (index === indexOfTab - 1) {
                console.log(">> index: ", index, indexOfTab, tab);
                $("#search-iframe").attr(
                  "src",
                  tab.inputSearch.length > 0
                    ? tab.inputSearch
                    : "https://www.bing.com/search?igu=1"
                ); //setting iframe src
                return {
                  ...tab,
                  isActive: true,
                };
              } else {
                return {
                  ...tab,
                  isActive: false,
                };
              }
            });
            tabList = updatedTabList.filter((tab) => tab.tabId != tabId[1]);
          }
        } else {
          tabList = tabList.filter((tab) => tab.tabId != tabId[1]);
        }
        // Remove the clicked list item
        renderTabs(tabList);
      }
      event.stopPropagation();
    });
  // Event handler for input change
  $("#input-id").on("change", function () {
    const activeTab = tabList.find((tab) => tab.isActive === true);
    const newSearchValue = $(this).val().trim();

    if (validateUrl(newSearchValue)) {
      updateTabSearch(activeTab.tabId, newSearchValue); // Update if valid URL
      $("#input-error").remove(); // Remove any existing error message
      $("#search-iframe").attr("src", newSearchValue);
    } else {
      $(this).after(
        "<span id='input-error' class='error'> <i class='fa-solid fa-circle-exclamation'></i><span> Invalid URL format.</span></span>"
      );
    }
  });

  /**
   * Controller Section Ends
   */

  /**
   *
   *
   * Helper Function Section starts
   *
   *
   */

  // This fucntion checks if the received value is of string datatype.
  function isString(value) {
    return typeof value === "string";
  }
  // Get tabs html Dom:
  function renderTabs(objList) {
    // This function creates Doms and Paint the Web page
    let listItems = "";
    if (objList.length === 0) {
      listItems = "";
      $("#input-id").val("");
      $("#search-iframe").attr("src", "https://www.bing.com/search?igu=1"); //when you delete last tab, reset iframe src
    } else {
      listItems = objList
        .map(
          (tabObj) => `<li id="tab-${tabObj.tabId}" class="tab ${
            tabObj.isActive ? "active" : ""
          }">
       <span class="tab-text">Tab ${tabObj.tabId}</span>
       <span class="tab-icon"><i class="fa-solid fa-x"></i></span>
     </li>`
        )
        .join(" ");
    }

    // Update input value based on the active tab
    const activeTab =
      objList.length > 0 && objList.find((tab) => tab.isActive === true);
    objList.length > 0 && $("#input-id").val(activeTab.inputSearch);
    $(".tab-right-container").html(listItems);
  }
  // Function to update a tab object based on input value
  function updateTabSearch(activeTabId, newSearchValue) {
    tabList = tabList.map((tab) =>
      tab.tabId === activeTabId ? { ...tab, inputSearch: newSearchValue } : tab
    );
  }
  function validateUrl(url) {
    const urlRegex =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return urlRegex.test(url);
  }

  /**
   * Helper Functions section Ends
   */
});
