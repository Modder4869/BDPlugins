//META{"name":"dateViewer"}*//
class dateViewer {
    constructor() {
        this.css = `
            #dv-mount {
                background-color: #2f3136;
                bottom: 0;
                box-sizing: border-box;
                display: flex;
                height: 95px;
                justify-content: center;
                position: absolute;
                width: 240px;
                z-index: 256;
            }

            #dv-main {
                --gap: 20px;
                background-color: transparent;
                border-top: 1px solid hsla(0, 0%, 100%, .04);
                box-sizing: border-box;
                color: #fff;
                display: flex;
                flex-direction: column;
                height: 100%;
                line-height: 20px;
                justify-content: center;
                text-align: center;
                text-transform: uppercase;
                width: calc(100% - var(--gap) * 2);
            }

            #dv-main .dv-date {
                font-size: small;
                opacity: .6;
            }

            .theme-light #dv-mount {
                background-color: #f3f3f3;
            }

            .theme-light #dv-main {
                border-top: 1px solid #e6e6e6;
                color: #737f8d;
            }

            .membersWrap-3wRngy .members-1bid1J {
                height: calc(100% - 95px);
            }
        `;

        this.markup = `
            <div id="dv-main">
                <div class="dv-time"></div>
                <div class="dv-date"></div>
                <div class="dv-weekday"></div>
            </div>
        `;

        this.mount = document.createElement("div");
        this.mount.id = "dv-mount";
        this.mount.innerHTML = this.markup;

        this.update = () => {
            this.main = document.querySelector("#dv-main");

            let date = new Date();
            this.time = date.toLocaleTimeString(this.getLanguage());
            this.date = date.toLocaleDateString(this.getLanguage(), {day: "2-digit", month: "2-digit", year: "numeric"});
            this.weekday = date.toLocaleDateString(this.getLanguage(), {weekday: "long"});

            if(this.main) {
                this.main.querySelector(".dv-time").innerHTML = this.time;
                this.main.querySelector(".dv-date").innerHTML = this.date;
                this.main.querySelector(".dv-weekday").innerHTML = this.weekday;
            }
        }
    }

    append() {
        document.querySelector(".membersWrap-3wRngy").appendChild(this.mount);
    }

    start() {
        BdApi.clearCSS("dv-css");
        BdApi.injectCSS("dv-css", this.css);
        this.onSwitch();
    }

    stop() {
        BdApi.clearCSS("dv-css");
        if(document.contains(this.mount))
            this.mount.remove();
    }

    load() {
        // insert coin
    }

    onSwitch() {
        if(document.querySelector(".membersWrap-3wRngy")) {
            if(document.contains(this.mount))
                return;

            this.append();
            this.update();

            clearInterval(this.interval);
            this.interval = setInterval(this.update, 1000);
        }
    }

    observer({addedNodes}) {
        for(let node, i = 0; i < addedNodes.length; i++) {
            if(addedNodes[i].classList && addedNodes[i].classList.contains("membersWrap-3wRngy"))
                return this.onSwitch();
        }
    }

    getName() {
        return "Date Viewer";
    }

    getDescription() {
        return "Displays current time, date and day of the week on the right side. The way how it's displayed depends on your locale conventions.";
    }

    getVersion() {
        return "0.2.0";
    }

    getAuthor() {
        return "hammy";
    }

    getLanguage() {
        return document.documentElement.lang;
    }
}
