var searchcViewTemplate = '<div class="page searchPage">' +
                            '<div class="autocomplete">' +
                              '<p>ПОШУК</p>' +
                              '<div class="right">' +
                                '<label for="from">Від</label>' +
                                '<input type="text" id="from" name="from" class="txt" />' +
                              '</div>' +
                              '<div class="right">' +
                                '<label for="to">До</label>' +
                                '<input type="text" id="to" name="to" class="txt" />' +
                              '</div>' +
                              '<div class="right">' +
                                '<input type="button" id="clear" name="clear" class="btn btn-default" value="очистити" />' +
                                '<input type="button" id="search" name="search" class="btn btn-default" value="знайти"  />' +
                              '</div>' +
                            '</div>' +
                            '<div>' +
                              '<div>' +
                                'Ви можете нажати "старт" і зробити два кліки: перший - точка відправлення, другий - призначення. Нажавши на "я тут!" точка відправлення автоматично стане відповідати вашому місцюзнаходження(якщо позволена геолокація). Для видалення міток на карті нажміть "видалити"' +
                              '</div>' +
                              '<div class="buttons">' +  
                                '<input type="button" id="start" name="start" class="btn btn-default" value="старт">' +
                                '<input type="button" id="here" name="here" class="btn btn-default" value="я тут!">' +
                                '<input type="button" id="delete" name="delete" class="btn btn-default" value="видалити">' +
                              '<div>' +
                            '<div class="info">' +
                            '</div>' +
                          '</div>';