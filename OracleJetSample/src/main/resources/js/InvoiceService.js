define(['ojs/ojcore', 'knockout', 'ContractService', 'StatusService'],
        function (oj, ko, ContractService) {
            var self = this;
            self.invoiceCollection = ko.observableArray([]);
            self.contracts = ContractService.fetch();

            function findContractById(id) {
                for (var i = 0; i < self.contracts().length; i++) {
                    var item = self.contracts()[i];
                    if (item.companyId == id) {
                        return item;
                    }
                }
                return {};
            }
            
            function findInvoiceByNumber(number) {
                for (var i = 0; i < self.invoiceCollection().length; i++) {
                    var item = self.invoiceCollection()[i];
                    if (item.number == number) {
                        return item;
                    }
                }
                return {};
            }

            var InvoiceService = {
                fetch: function () {

                    //if already created
                    if (self.invoiceCollection().length > 0) {
                        return self.invoiceCollection;
                    }

                    var invoice = {number: "acme-2", date: "2015-11-01", companyId: 1, paid: false};
                    invoice.paid = ko.observable(invoice.paid);
                    var contract = findContractById(invoice.companyId);
                    invoice.company = contract.company || "";
                    self.invoiceCollection.push(invoice);

                    invoice = {number: "acme-1", date: "2015-10-21", companyId: 1, paid: true};
                    invoice.paid = ko.observable(invoice.paid);
                    contract = findContractById(invoice.companyId);
                    invoice.company = contract.company || "";
                    self.invoiceCollection.push(invoice);

                    invoice = {number: "acme-1", date: "2015-10-21", companyId: 1, paid: true};
                    invoice.paid = ko.observable(invoice.paid);
                    contract = findContractById(invoice.companyId);
                    invoice.company = contract.company || "";
                    self.invoiceCollection.push(invoice);

                    invoice = {number: "wonder-1", date: "2015-11-11", companyId: 2, paid: false};
                    invoice.paid = ko.observable(invoice.paid);
                    contract = findContractById(invoice.companyId);
                    invoice.company = contract.company || "";
                    self.invoiceCollection.push(invoice);

                    self.invoiceCollection.valueHasMutated();
                    return self.invoiceCollection;
                },
                markPaid: function(invoice) {
                    var invoice = findInvoiceByNumber(invoice.number);
                    invoice.paid(true);
                }
            };
            return InvoiceService;
        });
