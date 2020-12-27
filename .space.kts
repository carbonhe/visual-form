job("visual-form"){
    container("node:alpine"){

      env["CHROME_BIN"] = "/usr/bin/chromium-browser"

      shellScript{
        interpreter = "/bin/sh"
        content = """
            set -e

            echo Install Chrome browser...
            apk update && apk upgrade && \
            echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
            echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
            apk add --no-cache bash chromium@edge nss@edge

            echo Install npm dependencies...
            yarn

            echo Run tests...
            yarn run test

            echo Run build library...
            yarn run build:lib
       """
      }
    }
}
