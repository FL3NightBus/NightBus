var searchcViewTemplate = '<div class="page searchPage">' +
                            '<div class="autocomplete">' +
                              '<p>SEARCH</p>' +
                              '<div class="right">' +
                                '<label for="from">from</label>' +
                                '<input type="text" id="from" name="from" class="txt" />' +
                              '</div>' +
                              '<div class="right">' +
                                '<label for="to">to</label>' +
                                '<input type="text" id="to" name="to" class="txt" />' +
                              '</div>' +
                              '<div class="right">' +
                                '<input type="button" id="clear" name="clear" class="btn btn-default" value="clear" />' +
                                '<input type="button" id="search" name="search" class="btn btn-default" value="search"  />' +
                              '</div>' +
                            '</div>' +
                            '<div class="click">' +
                              '<p>Where I am?<p>' +
                              '<input type="button" id="here" name="here" class="btn btn-default" value="Here!">' +
                              '<div>' +
                                '<p>' +
                                  '<img src="img/alert.png"> You can single click on two points to find your way:' +
                                '</p>' +
                                '<input type="button" id="start" name="start" class="dbl btn btn-default" value="start">' +
                                '<p> You can delete all markers on the map:</p>' +
                                '<input type="button" id="delete" name="delete" class="dbl btn btn-default" value="delete">' +
                              '</div>' +
                            '</div>' +
                            '<div class="info">' +
                            '</div>' +
                          '</div>';