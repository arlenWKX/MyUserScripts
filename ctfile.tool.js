// ==UserScript==
// @name         Crfile Tool
// @namespace    https://github.com/arlenWKX/MyUserScripts/
// @version      0.1
// @description  Ctfile Tool
// @author       arlenWKX
// @match        *://*/f/*
// @icon         https://favicon.yandex.net/favicon/v2/http://ctfile.com
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @require      https://lib.baomitu.com/jquery/3.6.0/jquery.js
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @require      https://lib.baomitu.com/clipboard.js/2.0.6/clipboard.min.js
// ==/UserScript==

(function() {
    'use strict';

    var jsonText;

    var url = document.URL;
    var n = url.search(/tempdir-/i);
    var fileID = url.substring(n);
    var pass = "";

    var r = Math.random();
    var fileInfoUrl = "https://webapi.ctfile.com/getfile.php?path=f&f=" + fileID + "&passcode=" + pass + "&token=false&r=" + r;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            jsonText = JSON.parse(xhr.responseText);
        }
    };
    xhr.open('get', fileInfoUrl, false);
    xhr.send(null);

    var fileUrl = "https://webapi.ctfile.com/get_file_url.php?uid=" + jsonText.file.userid + "&fid=" + jsonText.file.file_id + "&file_chk=" + jsonText.file.file_chk + "&app=0&acheck=2&rd=" + Math.random()
    jsonText == undefined
    xhr.open('get', fileUrl, false);
    xhr.send(null);

    var downloadUrl = jsonText.downurl

    window.onload = function(){
        var Button = document.createElement('button')
        Button.className="btn btn-warning mr-1 mb-1";
        Button.type="button";
        Button.innerHTML="获取直链";
        document.querySelector("#main-content > div > div > div:nth-child(8)").remove()
        document.querySelector("#main-content > div > div > div:nth-child(9)").remove()
        Button.onclick=function(){
            Swal.fire({
                titleText: "获取成功！",
                input: 'url',
                inputLabel: '点击下方按钮复制连接',
                inputValue: downloadUrl,
                icon: "success",
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: "关闭",
                showCloseButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    var clipboard = new ClipboardJS('.swal2-confirm', {
                        text: function(trigger) {
                            return downloadUrl;
                        }
                    });
                    clipboard.on('success', function(){
                        Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        }).fire({
                            icon: 'success',
                            title: '复制成功'
                        })
                    })
                }
            })
            Swal.disableInput()
        }
        document.querySelector("#main-content > div > div > div:nth-child(3)").appendChild(Button)
    }

})();
