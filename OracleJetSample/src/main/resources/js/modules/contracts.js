define(['knockout', 'ojs/ojcore', 'jquery', 'ContractService', 'MailService', 'ojs/ojtable', 'ojs/ojmodel', 'ojs/ojswitch', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojinputtext'],
function (ko, oj, $, ContractService, MailService) {

    function ContractViewModel() {
        var self = this;
        
        self.contractDataSource = ko.observable();

        var data = ContractService.fetch();
        self.atds = new oj.ArrayTableDataSource(data());
        self.contractDataSource(self.atds, {idAttribute: 'id'});

        //update after json fetch
        data.subscribe(function() {
            self.atds = new oj.ArrayTableDataSource(data());
            self.contractDataSource(self.atds, {idAttribute: 'id'});
        });

        self.buttonClick = function (data, event) {
            MailService.sendMail(event, data);
            return true;
        };

        self.modalClick = function (data, event) {
            $("div.mailDialog").ojDialog("close");
            return true;
        };
        
        //binding already happend
        //$(function() {
        //    ko.applyBindings(new self.buttonModel(), document.getElementsByClassName('buttons-container')[0]);
        //});
    }
    
    return ContractViewModel;
});
