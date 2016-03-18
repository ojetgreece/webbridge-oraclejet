define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdialog'],
        function (oj, ko, $)
        {
            var self = this;
            var MailService = {
                sendMail: function (event, contract) {
                    if (window.appFrame) {
                        //hack to convert knockout-wrapped properties to pure js
                        var flattened = JSON.parse(JSON.stringify(contract));

                        window.appFrame.sendMail(flattened);
                    }
                    else {
                        var parent = $(event.target).closest('.buttons-container');
                        $("div.mailDialog", parent).ojDialog("open");
                    }
                }
            };
            return MailService;
        });
