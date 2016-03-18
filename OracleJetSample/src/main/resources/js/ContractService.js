define(['ojs/ojcore', 'knockout', 'jquery', 'StatusService'],
        function (oj, ko, $, StatusService) {
            var self = this;
            self.contractUrl = "/api/contracts";

            self.contractCollection = ko.observableArray([]);
            
            function changePropagation(activeValue) {
                //this is bound to the contract that was modified
                if (activeValue){
                    ContractService.enable(this);
                } else {
                    ContractService.disable(this);
                }
            }

            var ContractService = {
                init: function () {
                    //init
                },
                disable: function(contract) {
                    
                    StatusService.updateStatus("Disabled contract " + contract.name + ", " + contract.company);
                },
                enable: function(contract) {
                    
                    StatusService.updateStatus("Enabled contract " + contract.name + ", " + contract.company);
                },
                fetch: function() {
                    
                    if(self.contractCollection().length > 0 ) {
                        return self.contractCollection;
                    }
                    $.getJSON(self.contractUrl,
                            function (data) {
                                data.forEach(function (entry) {
                                    entry.active = ko.observable(entry.active);
                                    entry.active.subscribe(changePropagation, entry);
                                    
                                    self.contractCollection.push(entry);
                                });
                                self.contractCollection.valueHasMutated();
                            });
                    return self.contractCollection;
                }
            };
            return ContractService;
        });
