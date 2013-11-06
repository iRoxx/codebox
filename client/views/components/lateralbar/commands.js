define([
    "hr/hr",
    "collections/commands"
], function(hr, Commands) {

    // List Item View
    var CommandItem = hr.List.Item.extend({
        className: "menu-item",
        template: "lateralbar/command.html",
        events: {
            "click a": "run"
        },

        // Constructor
        initialize: function() {
            CommandItem.__super__.initialize.apply(this, arguments);
            this.model.menuItem = this;
            return this;
        },

        // template arguments
        templateContext: function() {
            return {
                'command': this.model
            };
        },

        // Finish rendering
        finish: function() {
            // Open popover if needed
            var tooltip = true;
            var popover = this.model.get("popover");
            if (popover) {
                popover = _.defaults({}, popover, {
                    'html': true,
                    'trigger': 'click'
                });
                this.$("a").popover(popover);
                if (popover.trigger == "hover") tooltip = false;
            }

            // Tooltip
            if (tooltip) {
                this.$("a").tooltip({
                    'placement': 'right',
                    'delay': {
                        'show': 600,
                        'hide': 0
                    }
                });
            }

            return CommandItem.__super__.finish.apply(this, arguments);
        },

        // Run command
        run: function(e) {
            if (e) e.preventDefault();

            // Run command
            this.model.run();
        }
    });

    // Commands list
    var CommandsList = hr.List.extend({
        className: "menu-commands",
        Collection: Commands,
        Item: CommandItem,
        defaults: _.defaults({
            
        }, hr.List.prototype.defaults)
    });

    hr.View.Template.registerComponent("component.lateralbar.commands", CommandsList);

    return CommandsList;
});