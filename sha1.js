(async function () {
    async function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async function sha1Hash(input) {
        if (typeof calcSHA1 !== 'function') {
            await loadScript('https://techguy16.github.io/xpkeygen-js/sha1.js');
        }

        const hash = calcSHA1(input);
        return hash;
    }

    const descriptor = {
        blocks: [
            ['R', 'SHA-1 of %s', 'sha1Hash', 'Hello, world!']
        ],
        menus: {},
        url: 'https://github.com/techguy16'
    };

    ScratchExtensions.register('SHA1', descriptor, {
        sha1Hash: function (input, callback) {
            sha1Hash(input).then(hash => {
                // Call the callback to return the hash value to the variable attached to the block
                callback(hash);
            });
        }
    });
})();
