define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdialog'],
        function (oj, ko, $) {
            var StatusService = {
                updateStatus: function (msg) {
                    if (window.appFrame) {
                        window.appFrame.updateStatus(msg);
                    }
                }
            };
            return StatusService;
        });
