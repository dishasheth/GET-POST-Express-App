angular.module('mainApp',['datatables']).controller('mainApp',['$scope','$http','$window','DTOptionsBuilder', function ($scope, $http, $window, DTOptionsBuilder) {
    var vm = this;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', true);

        $http({
        method: "GET",
        url: '/getAllRequests'
        }).then(function (result) {
            for(var i=0;i<result.data.requests.length;i++)
            {
                var d=new Date(result.data.requests[i].req_utctime*1000);
                result.data.requests[i].req_utctime=d.toUTCString();   
            }
            vm.requests = result.data.requests;
        }).catch(function (err) {
            console.log(err);
        });

    $scope.newRequest = function(isValid){
        if(isValid)
        {
        var reqJson = {
            "data":
            {
            "req_id": $scope.new_reqid,
            "name": $scope.new_name,
            "email": $scope.new_email,
            "age": $scope.new_age,
            "gender": $scope.new_gender,
            "req_utctime": Math.round((new Date().getTime())/1000),
            "status": "Open"
            }
        };
        $http.post('/addRequest',reqJson)
        .then(function(response) {
                window.alert("New request created successfully");
                $('#myModal').modal('hide');
                $window.location.reload();
            }).catch(function (err) {
                console.log(err);
            }); 
        }
        else
        {
            alert('All fields are mandatory !');
        }
    }


}]);