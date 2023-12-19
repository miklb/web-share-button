let sheet;

// https://caniuse.com/mdn-api_cssstylesheet_replacesync
const supportsConstructableStylesheets =
    "replaceSync" in CSSStyleSheet.prototype;

class WebShare extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    cssDefault = `
    button {
      display: flex;
      flex-align: middle;
      gap: 0.5rem;
      padding: 0.35rem 0.5rem;
      margin-block-start: 0.5rem;
    }
    
    .social-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 0.5rem 0 0;
      padding: 0;
      gap: 0.5rem;
    }
    .social-links--share {
      gap: 0;
    }
    .social-links__item {
      list-style: none;
      margin: 0;
    }
    
    .social-link {
      border-radius: 0.375rem;
      color: #fff;
      display: inline-block;
      height: 80%;
      margin: 0;
      padding: 4px 6px;
      text-decoration: none;
      transform: scale(0.75);
      transition: text-decoration-color 0.25s ease, color 0.25s ease, background-color 0.25s ease;
    }
    .social-link__text {
      position: absolute !important;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
    }
    .social-link__icon {
      vertical-align: top;
      display: inline-block;
    }
    .social-link__icon path {
      fill: #fff;
    }
    .social-link--twitter {
      background-color: #26c4f1;
    }
    .social-link--twitter:hover, .social-link--twitter:active, .social-link--twitter:focus {
      background: #0b84a6;
    }
    .social-link--hacker-news {
      background-color: #f60;
    }
    .social-link--hacker-news:hover, .social-link--hacker-news:active, .social-link--hacker-news:focus {
      background: #993d00;
    }
    .social-link--facebook {
      background-color: #306199;
    }
    .social-link--facebook:hover, .social-link--facebook:active, .social-link--facebook:focus {
      background: #18304b;
    }
    .social-link--linkedin {
      background-color: #007bb6;
    }
    .social-link--linkedin:hover, .social-link--linkedin:active, .social-link--linkedin:focus {
      background: #003650;
    }
    .social-link--pinterest {
      background-color: #b81621;
    }
    .social-link--pinterest:hover, .social-link--pinterest:active, .social-link--pinterest:focus {
      background: #5d0b11;
    }`;

    generateCss() {
        if (!sheet) {
            if (supportsConstructableStylesheets) {
                sheet = new CSSStyleSheet();
                sheet.replaceSync(this.cssDefault);
            } else {
                sheet = document.createElement("style");
                sheet.textContent = this.cssDefault;
            }
        }

        if (supportsConstructableStylesheets) {
            this.shadowRoot.adoptedStyleSheets = [sheet];
        } else {
            this.shadowRoot.append(sheet.cloneNode(true));
        }
    }

    connectedCallback() {
        // Move the existing children into the shadow root
        while (this.firstChild) {
            this.shadowRoot.appendChild(this.firstChild);
        }
        this.generateCss();

        if ("share" in navigator) {
            this.swapForShareAPI();
        } else {
            this.prepForPopup();
        }
    }

    swapForShareAPI() {
        var $links = this.shadowRoot.querySelector('.social-links--share'),
            $parent = $links.parentNode,
            $button = document.createElement('button'),
            title = document.querySelector('h1.p-name,title').innerText,
            $description = document.querySelector('meta[name="og:description"],meta[name="description"]'),
            text = $description ? $description.getAttribute('content') : '',
            url = window.location.href;
        $button.innerHTML = 'Share <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448.003 446.746"><path d="M362.065 172.023c47.523 0 85.938-38.559 85.938-85.941C448.003 38.559 409.59 0 362.065 0s-86.082 38.559-86.082 86.082c0 7.406 1.235 14.477 3.008 21.34l-99.09 50.582c-18.699-22.031-46.531-36.051-77.711-36.051C45.78 121.953 0 167.726 0 224.143c0 56.246 45.777 102.02 102.19 102.02 28.617 0 54.418-11.812 72.93-30.758l65.164 38.715c-2.773 8.453-4.652 17.312-4.652 26.688 0 47.383 38.559 85.938 86.082 85.938s85.938-38.559 85.938-85.938c0-47.523-38.418-86.082-85.938-86.082-24.688 0-46.805 10.547-62.504 27.211l-63.266-37.582a101.633 101.633 0 008.27-40.211c0-11.816-2.102-23.117-5.786-33.676l97.648-49.848c15.793 19.008 39.328 31.398 65.984 31.398l.005.005z"/></svg>';
        $button.addEventListener('click', function(e) {
            navigator.share({ title, text, url })
        });
        $parent.insertBefore($button, $links);
        $links.remove();
    }
}

customElements.define('web-share', WebShare);