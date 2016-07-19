describe('provider: ngWigToolbar', function () {
    var toolbarProvider;
    
    beforeEach(function () {
        module('ngWig', (_ngWigToolbarProvider_) => {
            toolbarProvider = _ngWigToolbarProvider_;
        });

        inject();
    });

    describe('setButtons function', () => {
        it('should exist', () => {
            expect(toolbarProvider.setButtons).toBeDefined();
        });

        it('should throw an error if buttons are not provided', () => {
            try {
                toolbarProvider.setButtons();
            }
            catch(ex){
                expect(ex).toEqual('Argument "buttons" should be an array');
            }
        });

        it('should not throw an error if buttons are provided', () => {
           expect(() => { toolbarProvider.setButtons(['button1', 'button2']) }).not.toThrow();
        });
    });

    describe('addStandardButton function', () => {
        it('should exist', () => {
            expect(toolbarProvider.addStandardButton).toBeDefined();
        });

        it('should throw an error if name is not provided', () => {
            try {
                toolbarProvider.addStandardButton();
            }
            catch(ex){
                expect(ex).toEqual('Arguments "name", "title" and "command" are required');
            }
        });

        it('should throw an error if title is not provided', () => {
            try {
                toolbarProvider.addStandardButton('button1');
            }
            catch(ex){
                expect(ex).toEqual('Arguments "name", "title" and "command" are required');
            }
        });

        it('should throw an error if command is not provided', () => {
            try {
                toolbarProvider.addStandardButton('button1', 'My button');
            }
            catch(ex){
                expect(ex).toEqual('Arguments "name", "title" and "command" are required');
            }
        });

        it('should not throw an error if name, title and command are provided', () => {
            expect(() => { toolbarProvider.addStandardButton('button1', 'My button', 'fakeCmd()') }).not.toThrow();
        });
    });

    describe('addCustomButton function', () => {
        it('should exist', () => {
            expect(toolbarProvider.addCustomButton).toBeDefined();
        });

        it('should throw an error if name is not provided', () => {
            try {
                toolbarProvider.addCustomButton();
            }
            catch(ex){
                expect(ex).toEqual('Arguments "name" and "pluginName" are required');
            }
        });

        it('should throw an error if pluginName is not provided', () => {
            try {
                toolbarProvider.addCustomButton('button1');
            }
            catch(ex){
                expect(ex).toEqual('Arguments "name" and "pluginName" are required');
            }
        });
        
        it('should not throw an error if name and pluginName are provided', () => {
            expect(() => { toolbarProvider.addCustomButton('button1', 'my-button') }).not.toThrow();
        });
    });

    describe('$get function', () => {
        it('should exist', () => {
            expect(toolbarProvider.$get).toBeDefined();
        });

        describe('getToolbarButtons function', () => {
            it('should exist', inject(() => {
                expect(toolbarProvider.$get().getToolbarButtons).toBeDefined();
            }));

            it('should throw an error if provided buttons have not been added first', () => {
                try {
                    toolbarProvider.$get().getToolbarButtons(['button1']);
                }
                catch(ex){
                    expect(ex).toEqual('There is no "button1" in your library. Possible variants: list1,list2,bold,italic,link,clear-styles,forecolor,formats');
                }
            });
            
            it('should return 8 buttons by default', () => {
                expect(toolbarProvider.$get().getToolbarButtons().length).toEqual(8);
            });

            it('should return 1 button', () => {
                toolbarProvider.addCustomButton('button1', 'my-button');

                expect(toolbarProvider.$get().getToolbarButtons(['button1']).length).toEqual(1);
            });

            it('should add isActive function to a button', () => {
                toolbarProvider.addCustomButton('button1', 'my-button');

                expect(toolbarProvider.$get().getToolbarButtons(['button1'])[0].isActive).toBeDefined();
            });
        });
    });
});
