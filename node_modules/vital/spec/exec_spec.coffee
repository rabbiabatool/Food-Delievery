{ipso, original} = require 'ipso'

describe 'Exec', -> 
    
    before ipso (commander) -> 

        commander.does

            parse: -> 

                #
                # mock argv parse result
                #

                file: 'example.coffee'


    it 'loads all present components and evals the script passed at -f', 

        ipso (facto, Exec, fs, path) -> 

            files = []

            fs.does 

                # _statSync: (filename)  -> console.log statSync: filename
                # _lstatSync: (filename) -> console.log lstatSync: filename

                readdirSync: (filename) -> 

                    switch filename.split( path.sep ).pop()

                        when 'components' then return ['username-mock-component-name']

                    original arguments

                readFileSync: (filename) -> 

                    file = filename.split( path.sep )[-2..].join '/'
                    #console.log file
                    files.push file

                    switch file

                        when 'username-mock-component-name/component.json' 

                            #
                            # mock presence of component.json
                            #

                            return JSON.stringify

                                name: 'mock-component-name'
                                main: 'COMPONENT_MAIN_ENTRY_POINT.js'

                        when 'vital/example.coffee' 

                            return """

                            #
                            # in lieu of thorough testing in ipso very tricky there
                            # -----------------------------------------------------
                            #

                            # require "mock-component-name" 

                            #
                            # that require should be aliased into components/username-mock-component-name
                            # by ipso.components()
                            # 

                            # 
                            # therefore resulting in the next call to readFile (below)
                            #

                            """


                        when 'username-mock-component-name/COMPONENT_MAIN_ENTRY_POINT.js'

                            return ''


                        when 'COMPONENT_MAIN_ENTRY_POINT.js/package.json'

                            #
                            # huh? going down a rabbithole here...
                            #

                            return '{}' 


                    original arguments


            Exec.run()

            files.should.eql [
                'ipso/package.json'
                'username-mock-component-name/component.json'
                'vital/example.coffee'
            ]

            facto 
                incomplete: 'lazy dodge of rabbit hole into node/module.js or whatever'
                note: 'to finish - see what module.js is expecting of (l)statsSync calls'

