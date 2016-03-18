/**
 * Header module
 */
define(['knockout','ojs/ojcore', 'ojs/ojknockout', 'ojs/ojnavigationlist', 'ojs/ojoffcanvas', 'ojs/ojdatacollection-common', 'ojs/ojdialog'
], function (ko, oj) {
    /**
     * The view model for the header module
     */

    function HeaderViewModel() {
        var self = this;

        // 
        // Button used for toggling off screen data.
        // 
        var offScreenDataButton = {
            "label": "offscreen-toggle",
            "iconClass": "oj-fwk-icon oj-fwk-icon-hamburger",
            "url": "#"
        };

        // 
        // Dropdown menu states
        // 

        self.menuItemSelect = function (event, ui) {
            switch (ui.item.attr("id")) {
                case "About":
                    $("#aboutDialog").ojDialog("open");
                    break;
                default:
            }
        };

        // Data for application name
        var appName = {
            "id": "qs",
            "name": "Oracle JET Sample for Swing Web Bridge"
        };

        // 
        // Toolbar buttons
        // 
        var toolbarData = {
            // user name in toolbar
            "userName": "user@example.com",
            "toolbar_buttons": [ ],
            // Data for global nav dropdown menu embedded in toolbar.
            "global_nav_dropdown_items": [
                {"label": "About",
                    "url": "#"
                }
            ]
        };

        self.offScreenButtonIconClass = offScreenDataButton.iconClass;
        self.offScreenButtonLabel = offScreenDataButton.label;

        self.appId = appName.id;
        self.appName = appName.name;

        self.userName = ko.observable(toolbarData.userName);
        self.toolbarButtons = toolbarData.toolbar_buttons;
        self.globalNavItems = toolbarData.global_nav_dropdown_items;

        self.appDrawer =
                {
                    "edge": "start",
                    "displayMode": "push",
                    "selector": "#appDrawer",
                    "selection": "selectedItem"
                };

        // 
        // Data for application navigation
        // 
        var appNavData = [
            {
                name: 'Home',
                id: 'home',
                iconClass: 'demo-home-icon-24 demo-icon-font-24 oj-navigationlist-item-icon'
            },
            {
                name: 'About',
                id: 'about',
                iconClass: 'demo-education-icon-24 demo-icon-font-24 oj-navigationlist-item-icon'
            },
            {
                name: 'Contracts',
                id: 'contracts',
                iconClass: 'demo-contract-icon-24 demo-icon-font-24 oj-navigationlist-item-icon'
            },
            {
                name: 'Invoices',
                id: 'invoices',
                iconClass: 'demo-invoice-icon-24 demo-icon-font-24 oj-navigationlist-item-icon'
            }];

        self.dataSource = new oj.ArrayTableDataSource(appNavData, {idAttribute: 'id'});
     
        self.toggleAppDrawer = function ()
        {
            return oj.OffcanvasUtils.toggle(self.appDrawer);
        };

        //
        // Close off-screen content once window becomes larger.
        //
        var query = window.matchMedia("(min-width: 39.375rem)");
        var mqListener = function (event)
        {
            oj.OffcanvasUtils.close(self.appDrawer);
        };
        query.addListener(mqListener);

    }
    return HeaderViewModel;
});
