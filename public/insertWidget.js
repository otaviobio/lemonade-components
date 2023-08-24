// insertWidget.js
const upperArrowSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="upper-left-arrow" class="arrow"><path d="M9.41,8H17a1,1,0,0,0,0-2H7a1,1,0,0,0-.38.08,1,1,0,0,0-.54.54A1,1,0,0,0,6,7V17a1,1,0,0,0,2,0V9.41l8.29,8.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>'
const lowerArrowSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="lower-right-arrow" class="arrow"><path d="M17,6a1,1,0,0,0-1,1v7.59L7.71,6.29A1,1,0,0,0,6.29,7.71L14.59,16H7a1,1,0,0,0,0,2H17a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,18,17V7A1,1,0,0,0,17,6Z"></path></svg>'

async function createLinkList({ projectSource, supabaseUrl, apikey }) {
  return fetch(
    `${supabaseUrl}/rest/v1/components?project_source=eq.${projectSource}`,
    {
      headers: {
        apikey,
      },
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((json) => json);
}

function initialize(params) {
  let canInit = false;
  Object.entries(params).forEach(([key, value]) => {
    if (!value) {
      console.error(`${key} must be defined.`);
      return;
    }
    canInit = true;
  });

  if (!canInit) {
    return;
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const { projectSource, supabaseUrl, apikey } = params;
    const linkList = await createLinkList({
      projectSource,
      supabaseUrl,
      apikey,
    });

    if (!linkList || linkList.length === 0) {
      console.warn("No entries found for this project name.");
      return;
    }

    const fabButton = document.createElement("button");
    fabButton.classList.add("fab-button");
    document.body.appendChild(fabButton);

    const fabIconsContainer = document.createElement("div");
    fabIconsContainer.classList.add("fab-icons-container");
    fabIconsContainer.innerHTML = `${upperArrowSvg} ${lowerArrowSvg}`
    fabButton.appendChild(fabIconsContainer);

    const linkListUl = document.createElement("ul");
    linkListUl.classList.add("link-list");
    const listTitle = document.createElement("h4");
    listTitle.innerHTML = "Components list:";
    listTitle.classList.add("link-list-title");
    linkListUl.appendChild(listTitle);

    linkList.forEach((item) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      const category = document.createElement("span");
      anchor.textContent = item.component_name;
      category.textContent = item.component_category;
      anchor.href = item.url;
      anchor.target = "_blank";
      listItem.appendChild(anchor);
      linkListUl.appendChild(listItem);
      linkListUl.appendChild(category);
    });

    document.body.appendChild(linkListUl);
    function togglelinkListUl() {
      const upperArrowEl = document.getElementById("upper-left-arrow");
      const lowerArrowEl = document.getElementById("lower-right-arrow");

      linkListUl.classList.toggle("show");
      upperArrowEl.classList.toggle("turn");
      lowerArrowEl.classList.toggle("turn");
    }

    fabButton.addEventListener("click", () => togglelinkListUl());

    const primary = "#1E336D";
    const secondary = "#90BDC7";
    const background = "#fff"
    const accent = "#4D779A";

    const style = `
    *{
      z-index: 999999999999999999999999999999;
      font-family: Arial, Helvetica, sans-serif!important;
    }
      .fab-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: ${primary};
        opacity: 0.85;
        border-radius: 12px;
        font-size: 24px;
        color: white;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 0.7s ease;
        box-shadow: 0px 10px 13px -7px ${primary};
        padding: 0!important;
      }

      .fab-button:hover {
        opacity: 1;
        transition: all 0.7s ease;
      }

      .fab-icons-container {
        position: relative;
      }

      .arrow {
        position: absolute;
        width: 25px;
        transition: transform 0.5s ease;
        fill: ${secondary};
      }

      #upper-left-arrow {
        left: 0;
        bottom: 0;
        transform: translate(5px, 5px);
      }

      #upper-left-arrow.turn {
        transform: rotate(180deg) translate(0, 0);
        transition: transform 0.5s ease;
      }
      
      #lower-right-arrow {
        right: 0;
        top: 0;
        transform: translate(-5px, -5px);
      }
      
      #lower-right-arrow.turn {
        transform: rotate(180deg) translate(0, 0);
        transition: transform 0.5s ease;
      }
      
      .link-list {
        position: fixed;
        bottom: 60px;
        right: 20px;
        padding: 20px 32px 20px 20px;
        background-color: ${background};
        border: 2px solid ${primary};
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px ${accent};
  
        transform-origin: bottom right;
        transform: scale(0); /* Start with scale 0 to hide the list */
        transition: transform 0.3s ease; /* Smooth transition for scale */
      }

      .link-list-title {
        margin-top: 0;
        margin-bottom: 1rem;
        color: ${primary};
      }

      .link-list.show {
        transform: scale(1);
      }
      
      .link-list li {
        list-style: none;
      }
      
      .link-list li a {
        color: ${primary};
        font-weight: bold;
        text-decoration: none;
        opacity: 0.85;
      }
  
      .link-list li a:hover {
        color: ${accent};
      }

      .link-list span {
        font-size: 14px;
        color: ${secondary};
        font-weight: 500;
        padding-bottom: 12px;
        display: inline-block;
      }
      
      .link-list span:last-child {
        padding-bottom: 0;
      }
    `;

    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    document.head.appendChild(styleElement);
  });
}
