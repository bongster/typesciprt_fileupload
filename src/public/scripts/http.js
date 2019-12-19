var Http = (function () {
    // Setup request for json
    var getOptions = function (verb, data) {
        var options = {
            dataType: 'json',
            method: verb,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        return options;
    }
    // Set Http methods
    return {
        Get: function (path) {
            return fetch(path, getOptions('GET')).then(res => {
                if(!res.ok) {
                    return Promise.reject(res);
                }
                return Promise.resolve(res);
            });
        },
        Post: function (path, data) {
            return fetch(path, getOptions('POST', data)).then(res => {
                if(!res.ok) {
                    return Promise.reject(res);
                }
                return Promise.resolve(res);
            });
        },
        Put: function (path, data) {
            return fetch(path, getOptions('PUT', data)).then(res => {
                if(!res.ok) {
                    return Promise.reject(res);
                }
                return Promise.resolve(res);
            });
        },
        Delete: function (path) {
            return fetch(path, getOptions('DELETE')).then(res => {
                if(!res.ok) {
                    return Promise.reject(res);
                }
                return Promise.resolve(res);
            });
        },
        Upload: function (path, body) {
            return fetch(path, {
                method: 'POST',
                body,
            }).then(res => {
                if(!res.ok) {
                    return Promise.reject(res);
                }
                return Promise.resolve(res);
            });
        }
    };
})();
