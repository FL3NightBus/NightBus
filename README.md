# What is NightBus
Our application give you possibility to check information about night bus routes and position of the bus in Lviv. Also you can find the nearest to you bus station and know how much time you should wait for the bus on that station. So you can make decision to wait a bus you need or take taxi. And after that you can share your experience with anyone by chat.
## What can it do
Firstly, before page is load, we ask you to let us know your geoposition at this moment. We need it to set your position on map and also we use it in search function. If you refuse we will center map at railway station, because all bus routes includes it. In the main menu (yellow) there are 4 buttons you can use.
## Bus menu
Let you get information about bus routes.
1. By left checkboxes you can choose bus of which routes you want see on map. If checkbox will be "checked", on map appear few buses (it depends on server - it decide how many buses are on the route) and they will go on their way. At each request (5 seconds by default or it's up to you - there is an input) function get a pair of coordinates for each bus and calc angle between old and new bus position. Then each bus rotates on accordingly angle and adds to the map. Also each route has it own color of marker and if you put mouse over the marker it will show to you name of the route.

2. At the middle you can find names of routes and if you click on it, you'll see an information about route at the bottom of the page.

3. Right checkboxes show route on the map. If somebody need  to find bus on route but don't know on which route it is, it's possible to draw route on map without buses and just look at them. After you find right route you can let go bus on the way.

4. In mobile version to look at map you should push one more time at bus icon on the main menu.

## Chat menu
If you want share you experience with your friends or other customers of this service, leave claim to bus owners or write review to developers feel free use our chat, because it gives you all this possibilities.
1. One may choose 1 of 5 avatars which you will use at this time. Then one should enter name or nickname and push "ok".

2. After "registration" one may type any massage he want. When message is ready customer should push "Ok" button to send message to chat. Then all users can read this message and certainly comment it.
Firstly you can see 10 last messages on the page, but button "Next 10", as you can understand from its name, let you see next 10 messages.
## Search menu
Here one can use 3 functions which help to solve any logistic problem.

1. Search by adress
There are 4 elements on the top of the page. 2 inputs for adress "from/від" and "to/до". 
We can give to you information how connect 2 points (adresses) on the map and show how you can go from one adress to another on the bus.
When you done with adress push "search/знайти" button and look at result on the map. If you want change adress or continue looking you should push "cleare/очистити". Of course you are free to enter any adress but remember that this function work well in Lviv area. So, if you enter adress outer Lviv we couldn't help you to find it, but you'll know about it by alert box.

2. Certenly it could be situation when you don't know address or were you are. In this case we offer to you second way of search function. You push on "start/старт" button and menu will hide. On map feel free to click (not drag) on the two points - first of all on the "from/від" point and after that on the "to/до" point. If both points are in the Lviv function will find nearest bus stations to this points, show them (points and bus stations) on the map and give you information about bus routes in the Search menu. And after success search you may push the Search menu button to read that information. Also here is a usefull button "I am here/я тут". If you click on it, search function take you current geolocation place as first point of searching. So you really can use this function when you don't know where are you. 
## Time to go
In case when some buses are on the routes (you see them on the map) you can get information about time you need to wait them on any bus station. Just click on bus station icon and you will see time which nearest to this station bus to need to arrive to you. 
Thank you for time you spent to read this and for using our application.
***
We are ready to listen to you opinion about this service. Follow us on github - FL3NightBus.
