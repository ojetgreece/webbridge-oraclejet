define(['knockout', 'ojs/ojcore', 'jquery', 'InvoiceService', 'ojs/ojtable', 'ojs/ojmodel', 'ojs/ojswitch', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojinputtext'],
function (ko, oj, $, InvoiceService) {

    function InvoiceViewModel() {
        var self = this;
        
        self.invoiceDataSource = ko.observable();

        var data = InvoiceService.fetch();
        self.atds = new oj.ArrayTableDataSource(data());
        self.invoiceDataSource(self.atds, {idAttribute: 'number'});

        //update after api data fetch
        data.subscribe(function() {
            self.atds = new oj.ArrayTableDataSource(data());
            self.invoiceDataSource(self.atds, {idAttribute: 'number'});
        });

        self.markPaid = function (data, event) {
            
            InvoiceService.markPaid(data);
            return true;
        };
    }
    
    return InvoiceViewModel;
});
