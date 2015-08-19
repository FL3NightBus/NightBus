var searchcViewTemplate = '<div class="page searchPage">' +
                            '<div class="autocomplete">' +
                              '<p>ПОШУК</p>' +
                              '<div class="right">' +
                                '<label for="from">від</label>' +
                                '<input type="text" id="from" name="from" />' +
                              '</div>' +
                              '<div class="right">' +
                                '<label for="to">до</label>' +
                                '<input type="text" id="to" name="to" />' +
                              '</div>' +
                              '<div class="right center">' +
                                '<input type="button" id="clear" name="clear" class="btn btn-default" value="очистити" />' +
                                '<input type="button" id="search" name="search" class="btn btn-default" value="знайти"  />' +
                              '</div>' +
                            '</div>' +
                            '<div class="find">' +
                              '<div class="infoContainer">' +
                                'Ви можете натиcнути &lsquo;старт&rsquo; і зробити два кліки: перший &mdash; точка відправлення, другий &mdash; призначення. Натиснувши на &lsquo;я тут&rsquo; точка відправлення автоматично стане відповідати вашому місцезнаходженню (якщо ви дали відповідний дозвіл при завантаженні сторінки). Для видалення міток на карті натисніть &lsquo;видалити&rsquo;' +
                              '</div>' +
                            '</div>'+
                            '<div class="buttons">' +  
                              '<input type="button" id="start" name="start" class="btn btn-default" value="старт">' +
                              '<input type="button" id="here" name="here" class="btn btn-default" value="я тут">' +
                              '<input type="button" id="delete" name="delete" class="btn btn-default" value="видалити">' +
                            '</div>' +
                            '<div class="info"></div>' +
                          '</div>';                        