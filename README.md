# Imgless

An Angular JS application to tie into your current app, which allows you to use imgless tags instead of img tags.

All <imgless> tags are converted to data URI and stored within the images.json file.  Images that are already stored, are served from the json file (almost) instantly.  '''This also allows you to serve images without actually needing the image on your server'''.

## Usage

Add angular and the app.js to your project.

```
<script src="bower_components/angular/angular.min.js"></script>
<script src="js/app.js"></script>
```

Attach the app where needed.

```
<body ng-app="imgLess">
```

Use imgless tags.

```
<imgless src="img/toby.jpg" id="toby" class="toby"/>
```

## Example

I have included all files from the project in which this was created.  It's pretty straightforward, and you can see the implementation in index.html.

## License

The MIT License (MIT)

Copyright (c) 2016 Kalan Brock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
