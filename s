[1mdiff --git a/angular.json b/angular.json[m
[1mindex 4368ec3..08649ce 100644[m
[1m--- a/angular.json[m
[1m+++ b/angular.json[m
[36m@@ -30,6 +30,7 @@[m
               "src/assets"[m
             ],[m
             "styles": [[m
[32m+[m[32m              "@angular/material/prebuilt-themes/indigo-pink.css",[m
               "src/styles.scss"[m
             ],[m
             "scripts": [][m
[36m@@ -93,6 +94,7 @@[m
               "src/assets"[m
             ],[m
             "styles": [[m
[32m+[m[32m              "@angular/material/prebuilt-themes/indigo-pink.css",[m
               "src/styles.scss"[m
             ],[m
             "scripts": [][m
[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex a336960..257e532 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -9,10 +9,12 @@[m
       "version": "0.0.0",[m
       "dependencies": {[m
         "@angular/animations": "^15.0.0",[m
[32m+[m[32m        "@angular/cdk": "^15.0.3",[m
         "@angular/common": "^15.0.0",[m
         "@angular/compiler": "^15.0.0",[m
         "@angular/core": "^15.0.0",[m
         "@angular/forms": "^15.0.0",[m
[32m+[m[32m        "@angular/material": "^15.0.3",[m
         "@angular/platform-browser": "^15.0.0",[m
         "@angular/platform-browser-dynamic": "^15.0.0",[m
         "@angular/router": "^15.0.0",[m
[36m@@ -338,6 +340,46 @@[m
         "@angular/core": "15.0.4"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@angular/cdk": {[m
[32m+[m[32m      "version": "15.0.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@angular/cdk/-/cdk-15.0.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-iRLV6V6ksIshDL8Cdn1+DUNTRLqj+DAqmYTWYCEvH4qU6o0XSeXrAHNW5zNFqWgCZbmWt03G5jOBWBNaxa9QKw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": "^2.3.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "optionalDependencies": {[m
[32m+[m[32m        "parse5": "^7.1.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@angular/common": "^15.0.0 || ^16.0.0",[m
[32m+[m[32m        "@angular/core": "^15.0.0 || ^16.0.0",[m
[32m+[m[32m        "rxjs": "^6.5.3 || ^7.4.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@angular/cdk/node_modules/entities": {[m
[32m+[m[32m      "version": "4.4.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/entities/-/entities-4.4.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-oYp7156SP8LkeGD0GF85ad1X9Ai79WtRsZ2gxJqtBuzH+98YUV6jkHEKlZkMbcrjJjIVJNIDP/3WL9wQkoPbWA==",[m
[32m+[m[32m      "optional": true,[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.12"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/fb55/entities?sponsor=1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@angular/cdk/node_modules/parse5": {[m
[32m+[m[32m      "version": "7.1.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/parse5/-/parse5-7.1.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-Czj1WaSVpaoj0wbhMzLmWD69anp2WH7FXMB9n1Sy8/ZFF9jolSQVMu1Ij5WIyGmcBmhk7EOndpO4mIpihVqAXw==",[m
[32m+[m[32m      "optional": true,[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "entities": "^4.4.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/inikulin/parse5?sponsor=1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@angular/cli": {[m
       "version": "15.0.4",[m
       "resolved": "https://registry.npmjs.org/@angular/cli/-/cli-15.0.4.tgz",[m
[36m@@ -480,6 +522,70 @@[m
         "rxjs": "^6.5.3 || ^7.4.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@angular/material": {[m
[32m+[m[32m      "version": "15.0.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@angular/material/-/material-15.0.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-x7c6Uc9SnQW0AGTFJZFMQHP80YzmrExtrNn5vYUyWB9QFiNM+jcsqAsSEoGhABU/G5xs8fd40Fj7o2HBixQ0fw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@material/animation": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/auto-init": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/banner": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/base": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/button": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/card": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/checkbox": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/chips": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/circular-progress": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/data-table": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/density": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/dialog": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/dom": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/drawer": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/elevation": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/fab": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/feature-targeting": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/floating-label": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/form-field": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/icon-button": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/image-list": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/layout-grid": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/line-ripple": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/linear-progress": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/list": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/menu": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/menu-surface": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/notched-outline": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/radio": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/ripple": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/rtl": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/segmented-button": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/select": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/shape": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/slider": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/snackbar": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/switch": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/tab": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/tab-bar": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/tab-indicator": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/tab-scroller": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/textfield": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/theme": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/tooltip": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/top-app-bar": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/touch-target": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "@material/typography": "15.0.0-canary.7971d6ad5.0",[m
[32m+[m[32m        "tslib": "^2.3.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "@angular/animations": "^15.0.0 || ^16.0.0",[m
[32m+[m[32m        "@angular/cdk": "15.0.3",[m
[32m+[m[32m        "@angular/common": "^15.0.0 || ^16.0.0",[m
[32m+[m[32m        "@angular/core": "