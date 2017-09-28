"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";
let app = {
    result: {
        videos: [],
        selectedVideo: null,
        searchTerm: ""
    },


    init: function() {
        $('input').keyup(function(e) {
            if (e.keyCode == 13) {
                $("#root").html("");
                app.youtubeSearch($("#lupa").val());
            }
            //$("#lupa").val("");
        });
    },
    getVideoList: function(videos) {
        return videos.map((video, index) => {
            const imageUrl = video.snippet.thumbnails.default.url;
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            return `<div class="col-md-8 col-xs-8"> 
                        <iframe class="embed-responsive-item" src=${url}> </iframe>
                    </div>
                    <div class="col-md-3 col-xs-3">
                        <img class="media-object" src=${imageUrl} width="100%" />
                    </div>`;
        });
    },
    youtubeSearch: function(searchTerm) {
        console.log(searchTerm);
        YTSearch({ key: API_KEY, term: searchTerm }, data => {
            console.log("result", data);
            app.result = {
                videos: data,
                selectedVideo: data[0],
                searchTerm: searchTerm
            };
            var list = app.getVideoList(app.result.videos);
            console.log("lis: ", list);
            $("#root").append(list);
        });
    },
    videoSearch: function(searchTerm) {
        jQuery.getJSON("list.json", data => {
            console.log("result", data.items);
            app.result = {
                videos: data.items,
                selectedVideo: data.items[0],
                searchTerm: searchTerm
            };
            var list = app.getVideoList(app.result.videos);
            console.log("lis: ", list);
            $("#root").append(list);
        });
    }
};

$(document).ready(app.init);