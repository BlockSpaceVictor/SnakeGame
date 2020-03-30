# Simple Snake-like Game with Neural Network 

I wante to test a self-built neural network so I made this little game. It is similar to snake, in that the goal is to collect as much "food" as possible. 

The neural network is a simple perceptron, with variable input, hidden, and output layers, using sigmoid activation function, and simple biases. 

Chrome will complain if you try to just run the HTML file, becasue of a cross origin error. I think Chrome does not like the fact that I'm using seperate files for seperate classes, which are not http elements. 

Therefore, simply run via a python web server: 

`$ python -m SimpleHTTPServer` 

And then check `localhost:8000`


