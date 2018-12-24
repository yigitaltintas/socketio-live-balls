app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages = [ ];

    $scope.init = () => {
      const username = prompt('Please enter username');

        if(username)
            initSocket(username);
        else
            return false;
    };

    function initSocket(username){
        const connectionOptions = {
            reconnectionAttempts: 3,
            reconnectionDelay: 500
        };

        indexFactory.connectSocket('http://localhost:3000', connectionOptions)
            .then( (socket) => {
                socket.emit('newUser', { username });

                socket.on('newUser', (data) => {
                    const messageData = {
                        type : {
                            code : 0,
                            status : 'katildi'
                        },
                        username : data.username
                    };
                    $scope.messages.push(messageData);
                    $scope.$apply();
                });


                socket.on('disUser', (data) => {
                    const messageData = {
                        type : {
                            code : 0,
                            status : 'ayrildi'
                        },
                        username : data.username
                    };

                   $scope.messages.push(messageData);
                   $scope.$apply();
                });

            }).catch((err) => {
            console.log('hata', err);
        });
    }
}]);