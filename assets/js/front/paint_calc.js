$.fn.digits = function() {
    return this.each(function() {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    })
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}

function check_type() {
    var paint_type = $("input[name='painttype']:checked").val();
    if (paint_type == 1) {
        $(".tembok").css("display", "block");
    } else {
        $(".tembok").css("display", "none");
    }
};

var calc = function() {
    check_type();
    var result_likebox = "";
    var result_likebox_bottom = "";
    var everglo = {
            name: "Everglo",
            spread_rate: 12,
            pack: [2.5, 20],
            unit: "ltr"
        },
        supersilk = {
            name: "Supersilk",
            spread_rate: 12,
            pack: [2.5, 20],
            unit: "ltr"
        },
        noodor = {
            name: "No Odor",
            spread_rate: 12,
            pack: [2.5, 20],
            unit: "ltr"
        },
        alkali = {
            name: "Avitex Alkali Primer",
            spread_rate: 10,
            pack: [2.5, 20],
            unit: "ltr"
        },
        fres = {
            name: "Fres",
            spread_rate: 10,
            pack: [5, 25],
            unit: "kg"
        },
        avitex = {
            name: "Avitex",
            spread_rate: 10,
            pack: [5, 25],
            unit: "kg"
        },
        sunguard = {
            name: "Sunguard",
            spread_rate: 12,
            pack: [2.5, 20],
            unit: "ltr"
        };
    var wood_eco = {
            name: "Wood-eco Woodstain",
            spread_rate: 16,
            pack: [2.5, 20],
            unit: "ltr"
        },
        yoko_syn = {
            name: "Yoko",
            spread_rate: 10,
            pack: [0.7, 3.78],
            unit: "ltr"
        },
        avian_syn = {
            name: "Avian",
            spread_rate: 10,
            pack: [0.9, 3.78],
            unit: "ltr"
        },
        platinum = {
            name: "Platinum",
            spread_rate: 12,
            pack: [0.9],
            unit: "ltr"
        };
    var suzuka_lac = {
            name: "Suzuka Lacquer",
            spread_rate: 8,
            pack: [1, 20],
            unit: "kg"
        },
        belmas_zinc = {
            name: "Belmas Zinc Chromate",
            spread_rate: 8,
            pack: [1, 5, 20],
            unit: "kg"
        };
    var no_drop = {
            name: "No Drop",
            spread_rate: 2,
            pack: [1, 4, 20],
            unit: "kg"
        },
        no_drop_100 = {
            name: "No Drop 100",
            spread_rate: 0.8,
            pack: [2.5],
            unit: "kg"
        };
    var _arr_tembok = [everglo, supersilk, noodor, alkali, fres, avitex, sunguard];
    var _arr_kayu = [wood_eco, yoko_syn, platinum, avian_syn];
    var _arr_besi = [suzuka_lac, yoko_syn, belmas_zinc, avian_syn];
    var _arr_anti_bocor = [no_drop, no_drop_100];

    $('input[name="painttype"]').change(function() {
        check_type();
    });

    $('.tpaintcalc').click(function() {
        console.log($(".removelikebox").length);
        if ($(".removelikebox").length) {
            $(".removelikebox").data("id", "");
            $(".removelikebox").addClass("savelikebox");
            $(".removelikebox").removeClass("active");
            $(".removelikebox").removeClass("removelikebox");
        } //Get the checked value		//1 : tembok, 2 : kayu , 3 : besi, 4 : anti bocor
        var paint_type = $("input[name='painttype']:checked").val();
        var name_type = "";
        result_likebox = "";
        result_likebox_bottom = "";
        if (paint_type == 1) name_type = "tembok";
        else if (paint_type == 2) name_type = "kayu";
        else if (paint_type == 3) name_type = "besi";
        else name_type = "anti bocor";
        result_likebox = "Perkiraan kebutuhan jumlah cat untuk " + name_type + " dengan spesifikasi: <br /><br />";
        //new variable
        var _luas = 0,
            _luas_jendela = 0,
            _luas_pintu = 0,
            error = 0,
            _arr_used; /* CHECK AND GET VALUE */
        $('.number-err').text('');
        var _h = $('#val-hei').val(),
            _w = $('#val-wid').val(),
            _s = $('#val-num').val();
        if (!_s || $.isNumeric(_s) == false || _s == 0) {
            $('.number-err').append('Please enter a valid Number of Surfaces <br/>');
            error++;
        }
        if (!_w || $.isNumeric(_w) == false || _w == 0) {
            $('.number-err').append('Please enter a valid Width number <br/>');
            error++;
        }
        if (!_h || $.isNumeric(_h) == false || _h == 0) {
            $('.number-err').append('Please enter a valid Height number <br/>');
            error++;
        }
        result_likebox += "Panjang " + capitalizeFirstLetter(name_type) + " = " + _h + " m <br />";
        result_likebox += "Lebar " + capitalizeFirstLetter(name_type) + " = " + _w + " m <br />";
        result_likebox += "Jumlah " + capitalizeFirstLetter(name_type) + " = " + _s + " <br /><br />";
        if (paint_type == 1) {
            var jendela_h = $('#val-hei-window').val(),
                jendela_w = $('#val-wid-window').val(),
                jendela_s = $('#val-num-window').val();
            var pintu_h = $('#val-hei-door').val(),
                pintu_w = $('#val-wid-door').val(),
                pintu_s = $('#val-num-door').val();
            if (((jendela_h && $.isNumeric(jendela_h) == true && jendela_h != 0) && (jendela_w && $.isNumeric(jendela_w) == true && jendela_w != 0) && (jendela_s && $.isNumeric(jendela_s) == true && jendela_s != 0)) || ((!jendela_s) && (!jendela_w) && (!jendela_h))) {
                if (jendela_h == "") jendela_h = 0;
                if (jendela_w == "") jendela_w = 0;
                if (jendela_s == "") jendela_s = 0;
                result_likebox += "Panjang Jendela = " + jendela_h + " m <br />";
                result_likebox += "Lebar Jendela = " + jendela_w + " m <br />";
                result_likebox += "Jumlah Jendela = " + jendela_s + " <br /><br />";
            } else {
                $('.number-err').append('Please enter All Window Surface, Width, Height <br/>');
                error++;
            }
            if (((pintu_h && $.isNumeric(pintu_h) == true && pintu_h != 0) && (pintu_w && $.isNumeric(pintu_w) == true && pintu_w != 0) && (pintu_s && $.isNumeric(pintu_s) == true && pintu_s != 0)) || ((!pintu_s) && (!pintu_w) && (!pintu_h))) {
                if (pintu_h == "") pintu_h = 0;
                if (pintu_w == "") pintu_w = 0;
                if (pintu_s == "") pintu_s = 0;
                result_likebox += "Panjang Pintu = " + pintu_h + " m <br />";
                result_likebox += "Lebar Pintu = " + pintu_w + " m <br />";
                result_likebox += "Jumlah Pintu = " + pintu_s + " <br /><br />";
            } else {
                $('.number-err').append('Please enter All Door Surface, Width, Height <br/>');
                error++;
            }
        }
        if (error == 0) {
            //calculate luas
            _luas = parseFloat(_h * _w * _s);
            //if type tembok, then check for luas jendela dan pintu
            if (paint_type == 1) {
                if (((jendela_h && $.isNumeric(jendela_h) == true && jendela_h != 0) && (jendela_w && $.isNumeric(jendela_w) == true && jendela_w != 0) && (jendela_s && $.isNumeric(jendela_s) == true && jendela_s != 0)) || ((!jendela_s) && (!jendela_w) && (!jendela_h))) {
                    _luas_jendela = parseFloat(jendela_h * jendela_w * jendela_s);
                    _luas -= _luas_jendela;
                }
                if (((pintu_h && $.isNumeric(pintu_h) == true && pintu_h != 0) && (pintu_w && $.isNumeric(pintu_w) == true && pintu_w != 0) && (pintu_s && $.isNumeric(pintu_s) == true && pintu_s != 0)) || ((!pintu_s) && (!pintu_w) && (!pintu_h))) {
                    _luas_pintu = parseFloat(pintu_h * pintu_w * pintu_s);
                    _luas -= _luas_pintu;
                }
            }
            result_likebox += "Luas Bersih : " + _luas + "m <br />";
            result_likebox_bottom = "Perkiraan kebutuhan total liter / kg produk beserta rekomendasi jumlah pembelian paling minimumnya: <br/><br />";
            //calculate the product needed
            var i = 0;
            if (paint_type == 1) _arr_used = _arr_tembok;
            else if (paint_type == 2) _arr_used = _arr_kayu;
            else if (paint_type == 3) _arr_used = _arr_besi;
            else _arr_used = _arr_anti_bocor;
            $('.paintcosts').text('');
            for (i = 0; i < _arr_used.length; i++) {
                var _data = _arr_used[i];
                var _nama_produk = _data.name;
                var _spread_rate = _data.spread_rate;
                var _satuan = _data.unit;
                var _container = _data.pack;
                var _jumlah = parseFloat(_luas / _spread_rate);
                //element to append
                //nama product
                var _element = '<div class="result-subtitle">' + _nama_produk + ' ( ' + commaSeparateNumber(_jumlah.toFixed(2)) + ' ' + _satuan + ')</div>';
                _element += '<div class="result-field">';
                result_likebox_bottom += _nama_produk + " = " + commaSeparateNumber(_jumlah.toFixed(2)) + " " + _satuan + " <br/>";
                result_likebox_bottom += "Ukuran: <br/>";
                var _indexProduct = _container.length - 1;
                var _counter = 0;
                while (_jumlah > 0) {
                    //ukuran tanki
                    var _tanki = parseFloat(_container[_indexProduct]);
                    //selama jumlah - tanki, jumlah bisa dikurangi si tanki, dan brarti bisa pakai product ini.
                    if ((_jumlah - _tanki) > 0) {
                        _counter++;
                        _jumlah -= _tanki;
                    } else if ((_jumlah - _tanki) == 0) {
                        //pas 0, langsung cetak.
                        _counter++;
                        _jumlah -= _tanki;
                        //element to append jumlah tanki
                        _element += _counter + ' x ' + _tanki + ' ' + _satuan;
                        result_likebox_bottom += _counter + ' x ' + _tanki + ' ' + _satuan + ' <br/>';
                    } else {
                        //apakah tidak ada ukuran tangki lain ?
                        if (_indexProduct == 0) {
                            //ukuran trakhir.
                            //apa boleh buat pake tangki ini.
                            _counter++;
                            _jumlah -= _tanki;
                            //element to append jumlah tanki
                            _element += _counter + ' x ' + _tanki + ' ' + _satuan;
                            result_likebox_bottom += _counter + ' x ' + _tanki + ' ' + _satuan + ' <br/>';
                        } else {
                            //ada product lain, cetak dulu yg sekarang.
                            if (_counter > 0) {
                                _element += _counter + ' x ' + _tanki + ' ' + _satuan + ' + ';
                                result_likebox_bottom += _counter + ' x ' + _tanki + ' ' + _satuan + ' + ';
                            }
                            //turunin index. reset counter.
                            _counter = 0;
                            _indexProduct--;
                        }
                    }
                }
                _element += ' </div>';
                result_likebox_bottom += "<br/>";
                $('.paintcosts').append(_element);
                // _data = [];
                // _nama_produk = "";
                // _spread_rate = "";
                // _satuan = "";
                // _container = [];
                // _element = "";
            }
            // console.log(result_likebox_bottom);
            $("#surfa").text(_luas);
            $("#surfa").digits();
            $("#surfa").append(' m\xB2');
            $('.result').addClass('active');
            $('.tpaintcalc').text('Recalculate');
        }
    });

    $(document).on("click", '.savelikebox', function() {
        if (result_likebox == "" || result_likebox_bottom == "") {
            $('#popup .modal-title').html("Error !!!");
            $('#popup .modal-text').html('<p>Please Calculate First.</p>');
            $('#popup').addClass('active');
        } else {
            $.ajax({
                type: "post",
                url: '/paint-calculator/send',
                cache: false,
                data: {
                    _top: result_likebox,
                    _bottom: result_likebox_bottom
                },
                dataType: 'json',
                success: function(json) {
                    $('#loading').removeClass('active');
                    if (json.is_error == true) {
                        $('#popup .modal-title').html(json.data);
                        if (json.data == "Please Login First to Save to Likebox.") $('#popup .modal-text').html('<p><button class="btn" type="button" onclick="location.href=\'/login\'">Go To Login</button></p>');
                        else $('#popup .modal-text').html('');
                        $('#popup').addClass('active');
                    } else {
                        $(this).data("id", json.id);
                        likebox("paint_calc", json.id);
                    }
                },
                error: function() {
                    $('#loading').removeClass('active');
                    $('#popup .modal-title').html("Error !!!");
                    $('#popup .modal-text').html('<p>Something Went Wrong.</p>');
                    $('#popup').addClass('active');
                }
            });
        }
    });

    $(document).on("click", '.removelikebox', function() {
        var pcalc = $(this).data("id");
        likebox_remove("paint_calc", pcalc);
    });
}

$(document).ready(function () {
    calc();
});
