import angular from 'angular';

import treeherder from '../treeherder';
import { getApiUrl } from '../../helpers/urlHelper';

treeherder.factory('ThJobTypeModel', [
    '$http',
    function ($http) {

        // ThJobTypeModel is the js counterpart of job_type

        const ThJobTypeModel = function (data) {
            // creates a new instance of ThJobTypeModel
            // using the provided properties
            angular.extend(this, data);
        };

        ThJobTypeModel.get_uri = function () {
            const url = getApiUrl("/jobtype/");
            return url;
        };

        ThJobTypeModel.get_list = function (options) {
            // a static method to retrieve a list of ThJobTypeModel
            options = options || {};
            return $http.get(ThJobTypeModel.get_uri(), {
                cache: true,
                params: options
            })
                .then(function (response) {
                    const item_list = [];
                    angular.forEach(response.data, function (elem) {
                        item_list.push(new ThJobTypeModel(elem));
                    });
                    return item_list;
                });
        };

        ThJobTypeModel.get = function (pk) {
            // a static method to retrieve a single instance of ThJobTypeModel
            return $http.get(ThJobTypeModel.get_uri()+pk).then(function (response) {
                return new ThJobTypeModel(response.data);
            });
        };

        return ThJobTypeModel;
    }]);
