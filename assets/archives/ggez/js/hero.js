/**
 * CptPt = Competitive Point(경쟁전 점수)
 */

/**
 * 주의 avg가 crawl된 현재 값임
 */

/**
 * Global Variable Delclaration
 */
var stats; // data from getStats.php page

/**
 * Init Javascript Excution
 */
// 주의 : window.onload의 심각한 단점(긴로딩, 페이지내 1개만 존재가능)
// 다른페이지를 로딩할 때 onload가 있으면 동작하지 않음
window.onload = function () {
  // ovLoading.html 가져오기.
};

$(document).ready(function () {
  // var btg = getQueryParam('btg');	// Get Battle Tag from Url
  // var isSample = (getQueryParam('sample') == 'true');
  // var loc = getQueryParam('loc');
  // var device = getQueryParam('device');

  if (btg == false) {
    // window.location.href보다 좋다. replace는 기존페이지를 보관하지 않는다.
    window.location.replace('ggez.kr');
  }

  //css 대응 불가한(클래스 추가, 삭제) 자바스크립트 코드(미디어쿼리사용)
  initDispaly();

  // Javascript를 사용하는 도표들의 초기값을 설정한다.
  initConfig();

  // getStats와 관련없는 초기 디스플레이 값을 설정한다.
  initParam(btg);

  // Init이 정상적으로 되면 Loading Image 출력
  displayLoadingScreen(true);

  // Set Title(Battl Tag)
  runUpdateStatsThread(/*waitTime=*/ 0, /*timeout=*/ 200); // 200ms는 20초

  // ajax로 getStats.php에서 stats 요청
  getStats(btg, loc, device, isSample);

  // 버튼 동작을 지정합니다.
  initButtonMap();

  console.log('initialize complete');
});

function initConfig() {
  initStarRating();
  initChrt(); // 	//Radar Chart 필요한것 data(데이터 정보, 안에 차트 색깔)와 option(라벨링과 폰트)
}

function initParam(btg) {
  setBattleTag(btg);
}

/** css 대응 불가한(클래스 추가, 삭제) 자바스크립트 코드(미디어쿼리사용) **/
function initDispaly() {
  /** media query 대응 **/
  // loading할때 호출
  mediaQuery();
  // navbar media query js로 대응
  // resize는 사이즈 변경때만 호출
  $(window).resize(function () {
    mediaQuery();
  });
}

function mediaQuery() {
  if ($(window).width() >= 768) {
    // PC
    $('#heroContent-selector').removeClass('navbar-fixed-bottom');
  } else {
    // 모바일
    $('#heroContent-selector').addClass('navbar-fixed-bottom');
    $('#selectorWrapper').removeClass('in');
  }
}

//Update User Stat
//Stat을 Display에 반영합니다.
function initUpdateStats() {
  /** normal Content **/
  // ProfileData
  setBattleTagImage();

  //Trend Data
  setTrendButtonLabel(); // Trend Button에 게임경기수 라벨을 붙인다.
  updateTrendData();

  /** Hero Content **/
  var most3Heroes = getMostHero();

  updateNormalData();
  updateMostData(most3Heroes);

  // 주의 : 이함수를 이동할때는 주의할 것.
  // 반드시 most 3 hero를 확정한뒤에 이 함수를 사용해야함.
  initActive('todayBtn', most3Heroes[0], 'silverBtn');

  updateHeroData(true);
  updatePlayTimeLabel('All'); // 최초 한번만 필요하므로 updateHeroData(true)에서 분리하였음

  displayLoadingScreen(false); // Loading Screen off
}

function initButtonMap() {
  /**
   *  Button Click Action
   */

  // 갱신하기 버튼.
  $('#updateBtn').click(function () {
    getStats(btg, type);
  });

  // 전체 요약 페이지 버튼
  // Trend Button
  $('.trendBtn').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    updateTrendData();
  });

  // 영웅 상세 페이지 버튼
  // 기간 데이터 선택 버튼
  $('.heroPeriodBtn').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    updateHeroData(false); // Update Flag, For not updating Season Data(false)
  });

  // 영웅 선택 버튼
  $('.heroList div.heroContainer')
    .siblings()
    .not('.heroList div.roleContainer')
    .click(function () {
      $('.heroList div.heroContainer').siblings().not('.heroList div.roleContainer').removeClass('active');
      $(this).addClass('active');
      updateHeroData(true); // Update Flag, set updating Season Data(true) // 영웅을 클릭할때는 계속 update 해야하지만, 어제, 오늘, 주간경기를 클릭할땐 필요없다.
    });

  // 티어 선택 버튼
  $('.tierSelectBtn').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    updateTierData();
    updateResultColumn();
  });

  // 레이더 테이블 결과값 버튼
  $('#hero-radarTable th:nth-child(5)').click(function () {
    shiftResultCase();
    updateResultColumn();
  });

  // Description
  $('#hero-radarTable th:nth-child(1) button').click(function () {
    if (descriptionIndex == 1) {
      addDescription();
    } else {
      removeDescription();
    }
    shiftDscpIndex();
  });

  // XXX : 현재는 클릭하면 그냥 HIDE가 되게 해놓았음
  // 바탕화면을 찍었을때 칼랩스 들어가게 하는 것.
  //	if($(window).width() >= 768){
  //		$(".heroPeriodBtn-Group").click(function(){
  //			$("#selectorWrapper").collapse('hide');
  //		});
  //		$(".tierSelectBtn-Group").click(function(){
  //			$("#selectorWrapper").collapse('hide');
  //		});
  //		$("#heroList").click(function(){
  //			$("#selectorWrapper").collapse('hide');
  //		});
  //	} else {
  //		$("#selectorWrapper").addClass("in");
  //		$("#heroContent-fixed-header .left button").css("visibility" , "hidden");
  //	}

  // 테이블 선택 버튼
  // if(window.stats == null) redirect 해당사용자를 찾을 수 없습니다.
  $('#accordion1').on('shown.bs.collapse', function () {
    $('#package1 i.indicator').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
  });
  $('#accordion1').on('hidden.bs.collapse', function () {
    $('#package1 i.indicator').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
  });

  $('#accordion2').on('shown.bs.collapse', function () {
    $('#package2 i.indicator').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
  });
  $('#accordion2').on('hidden.bs.collapse', function () {
    $('#package2 i.indicator').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
  });
}

// 현재 active된 버튼을 스스로 계산하여 데이터를 업데이트 합니다.
// 다른 변수가 필요하지 않습니다.
function updateTrendData() {
  var selBtnId = getSelTrendBtnId(); // 현재 Active 된 버튼의 id를 가져온다.

  // 라벨변경
  setTrendLabel(selBtnId);
  setTrendCptLabel(selBtnId);

  // get Pre & post index
  var indexes = getIndex(selBtnId);
  var preIndex = indexes[0]; // today, yesterday, week 값이다.
  var postIndex = indexes[1]; //

  // Check Update가 NULL이면 게임을 하지 않았으므로 NOGAME을 반환한다.
  if (!checkUpdate('All', preIndex)) {
    //		$(".trend > .contentBoxWrapper").collapse('hide');
    // no game panel collapse in
    //		return;
  } else {
    //		$(".trend > .contentBoxWrapper").collapse('show');
    // no game panel collapse
  }

  // Set Data
  setTrendCpt(preIndex, postIndex);
  setTrendWinRating('avg', preIndex);
  setTrendPtRating('avg', preIndex);
  //	setTrendBurnedTime('avg', preIndex);
  //	setTrendKDA('avg', preIndex);
}

/**
 *
 *
 *
 *  Change Data
 *
 *
 *
 * **/

/** Label Change **/
function setFixedBtmLabel(hero, period) {
  //Set 3 Box Main Title
  var imgId = hero.toLowerCase();
  var imgUrl = "url('/assets/archives/ggez/img/icon-" + imgId + ".png')";
  var elemUrl = '#heroContent-fixed-header';

  var lowerText = '';
  if (period == 'week') {
    lowerText = '주간 경기 결과';
  } else if (period == 'ystday') {
    lowerText = '어제 경기 결과';
  } else {
    lowerText = '오늘 경기 결과';
  }

  $('#titleHeroImg').css('background-image', imgUrl);
  $(elemUrl + ' .upperText').text(getHeroName(hero));
  $(elemUrl + ' .lowerText').text(lowerText);
}

function updateNormalData() {
  // Tier Image Update
  var cptPt = getStat('All', 'cptPt', 'avg');
  var fileName = getTierImgFileName(cptPt);
  var tierImgUrl = getImgUrl(fileName, 'png');
  var winRating = getStat('All', 'winRating', 'avg');

  $('#box-1 > div:nth-child(2)').text(cptPt);
  $('#box-2 > div:nth-child(2)').css('background-image', tierImgUrl);

  $('#box-3 > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)').text(winRating[4]);

  $('#box-3 > div:nth-child(2) > div:nth-child(2)').text(winRating[1] + '/' + winRating[3] + '/' + winRating[2]); // 승 패 무

  //	$("#main-2").text(window.stats['All']['winRating']['avg'][4]);

  //	$("#main-3").text(window.stats['All']['KDA']['avg']);	//	KDA 정보가 없음 ㅠ
  //	$("#main-4").text(window.stats['All']['update']['ystday']);
  //	$("#main-5").text(window.stats['All']['update']['today']);
  //	$("#main-6").text(window.stats['All']['update']['week']);
}

// Radar Chart Legend Label
function setRadarChartLabel(selectedPeriod) {
  window.radarCharts.data.datasets[0].label = '내 평균';
  if (selectedPeriod == 'week') {
    window.radarCharts.data.datasets[1].label = '내 주간';
  } else if (selectedPeriod == 'ystday') {
    window.radarCharts.data.datasets[1].label = '내 어제';
  } else {
    window.radarCharts.data.datasets[1].label = '내 오늘';
  }
}

function setRadarTableLabel(selectedPeriod) {
  var label = '--';

  if (selectedPeriod == 'week') {
    label = '내 주간';
  } else if (selectedPeriod == 'ystday') {
    label = '내 어제';
  } else {
    label = '내 오늘';
  }
  $('#hero-radarTable thead th:nth-child(3)').html('<div>' + label + '</div>');
}

function setRadarTableTierLabel(selectedTierId) {
  var labe = '--';

  switch (selectedTierId) {
    case 'bronze':
      label = '브론즈';
      break;
    case 'silver':
      label = '실버';
      break;
    case 'gold':
      label = '골드';
      break;
    case 'platinum':
      label = '플레';
      break;
    case 'dia':
      label = '다이아';
      break;
    case 'master':
      label = '마스터';
      break;
    case 'grandMaster':
      label = '그랜드 마스터';
      break;
    default:
      break;
  }
  if (selectedTierId == 'grandMaster') {
    $('#hero-radarTable thead th:nth-child(4)').html('<div>그랜드<br>마스터</div>');
  } else {
    $('#hero-radarTable thead th:nth-child(4)').html('<div>' + label + '<br>평균</div>');
  }

  // 레이더라벨(레전드)
  if (selectedTierId == 'grandMaster') {
    window.radarCharts.data.datasets[2].label = label;
  } else {
    window.radarCharts.data.datasets[2].label = label + ' 평균';
  }
}

function setTierSelectSubTitle(heroId) {
  var heroName = getHeroName(heroId);
  $('#tierSubTitle').text('(' + heroName + ')');
}

// Set Radar Chart
function setRadarChart(selectedHeroId, selectedPeriod, tierId) {
  // Set Label
  window.radarCharts.data.labels = window.stats[selectedHeroId]['radarLabel'];
  // Set Average
  window.radarCharts.data.datasets[0].data = window.stats[selectedHeroId]['radarPt']['avg'];
  // Set Period
  window.radarCharts.data.datasets[1].data = window.stats[selectedHeroId]['radarPt'][selectedPeriod];
  // TODO:set third Period
  window.radarCharts.data.datasets[2].data = window.tiers[tierId][selectedHeroId]['radarPt'];
  // Update
  window.radarCharts.update();
}

// Set Radar Table Data
function setRadarTableData(selectedHeroId, periodId, tierId) {
  var result;

  var avgUpdateTime = getStat(selectedHeroId, 'update', 'avg');
  var prdUpdateTime = getStat(selectedHeroId, 'update', periodId);
  var labels = getStat(selectedHeroId, 'radarLabel');
  var units = getStat(selectedHeroId, 'radarUnit');
  var descriptions = getStat(selectedHeroId, 'radarDescription');

  for (var i = 0; i < labels.length; i++) {
    // 2열
    var prePt = null;
    var preRaw = null;
    // 3열
    var postPt = null;
    var postRaw = null;
    // 4열
    var tierPt = null;
    var tierRaw = null;
    // 5열
    var result_col = null; //결과항목

    // avgUpdateTime이 0일때도 if문 안으로 안들어간다.
    if (avgUpdateTime != null && avgUpdateTime > 0) {
      var prePt = getStat(selectedHeroId, 'radarPt', 'avg', i);
      var preRaw = getStat(selectedHeroId, 'radarRaw', 'avg', i);
    }

    if (prdUpdateTime != null && prdUpdateTime > 0) {
      var postPt = getStat(selectedHeroId, 'radarPt', periodId, i);
      var postRaw = getStat(selectedHeroId, 'radarRaw', periodId, i);
    }

    tierPt = getTierStat(tierId, selectedHeroId, 'radarPt', i);
    tierRaw = getTierStat(tierId, selectedHeroId, 'radarRaw', i);

    //		console.log("prePt : " + prePt + ", postPt : " + postPt + ", tierPt : " + tierPt);
    //		console.log("preRaw : " + preRaw + ", postRaw : " + postRaw + ", tierRaw : " + tierRaw);

    preRaw = roundVal(preRaw);
    postRaw = roundVal(postRaw);
    tierRaw = roundVal(tierRaw);
    result += createTableRows(
      labels[i],
      descriptions[i],
      units[i],
      prePt,
      preRaw,
      postPt,
      postRaw,
      tierPt,
      tierRaw,
      result_col
    );
  }

  $('#hero-radarTable .table tbody').html(result);
}

function createTableRows(label, description, unit, prePt, preRaw, postPt, postRaw, tierPt, tierRaw, result_col) {
  var result = '';

  if (description == null) {
    description = '';
  }

  //	result += '<td><div>'+ label + '</div><div>' + description + '</div></td>';
  result += '<td><div>' + label + '</div></td>';
  result += createTableCell(prePt, preRaw, unit);
  result += createTableCell(postPt, postRaw, unit);
  result += createTableCell(tierPt, tierRaw, unit);

  // 결과 컬럼 만들기.(deprecated)
  //	if(prePt != '-' && postPt != '-'){
  //		result_col = getResultCellHtml(prePt, postPt);	// 5번째 결과 column
  //	}
  //	result += '<td>' + result_col +'</td>';

  // 결과 컬럼 만들기.
  result += '<td>-</td>';
  return '<tr>' + result + '</tr>';
}

function removeDescription() {
  var tableLength = $('#hero-radarTable tbody tr').length;

  for (var i = 0; i < tableLength; i++) {
    // 마지막 행은 디스크립션이 없으므로 꼭 추가/제거가 필요없다.
    if (i != tableLength - 1) {
      $('#hero-radarTable td:nth-child(1) > div:nth-child(2)').remove();
    }
  }
}

function addDescription() {
  var selectedHeroId = getSelectedHeroId();
  var tableLength = $('#hero-radarTable tbody tr').length;
  var descriptions = getStat(selectedHeroId, 'radarDescription');

  for (var i = 0; i < tableLength; i++) {
    var columnIndex = i + 1;
    // 마지막 행은 디스크립션이 없으므로 꼭 추가/제거가 필요없다.
    if (i != tableLength - 1) {
      $('#hero-radarTable tbody tr:nth-child(' + columnIndex + ') td:nth-child(1)').append(
        '<div>' + descriptions[i] + '</div>'
      );
    }
  }
}

function createTableCell(pt, raw, unit) {
  if (pt == null && raw == null) {
    return '<td><div>-</div></td>';
  }

  if (pt == null) {
    pt = '-';
  }

  if (raw == null) {
    raw = '-';
  }

  return '<td><div>' + addPtLabel(pt) + '</div><div>' + raw + '<span>' + unit + '</span></div></td>';
}

function createResultCell() {
  return '<td>-</td>';
}

var resultShiftIndex = 1;

//case1(내평균 - 내 case2
function shiftResultCase() {
  if (resultShiftIndex == 2) {
    resultShiftIndex = 0;
  } else {
    resultShiftIndex += 1;
  }
}

function getColIndexes() {
  if (resultShiftIndex == 0) {
    preIndex = 2; // 내 평균
    postIndex = 3; // 내 오늘
  } else if (resultShiftIndex == 1) {
    preIndex = 4; // 티어평균
    postIndex = 2; // 내 평균
  } else if (resultShiftIndex == 2) {
    preIndex = 4; // 티어평균
    postIndex = 3; // 내 오늘
  }

  return [preIndex, postIndex];
}

var descriptionIndex = 1;

function shiftDscpIndex() {
  if (descriptionIndex == 1) {
    descriptionIndex += 1;
  } else {
    descriptionIndex = 1;
  }
}

// 주의 : 반드시 radar table이 완전히 갱신된 뒤에 선언할것. 그래야만 현재 그려진 것에서 업데이트가 됨. .html 함수 뒤에 사용할것.
function updateResultColumn() {
  var indexes = getColIndexes();
  preIndex = indexes[0];
  postIndex = indexes[1];

  // Underline Update(th 안의 항목을 div로 선언한뒤 border-bottom 1px을 줌)
  $('#hero-radarTable th div').css('border-bottom', 'initial');
  $('#hero-radarTable th:nth-child(' + preIndex + ') div').css('border-bottom', '1px solid red');
  $('#hero-radarTable th:nth-child(' + postIndex + ') div').css('border-bottom', '1px solid red');

  var tableLength = $('#hero-radarTable tbody tr').length;

  // prepare sum of pre, post
  var preSum = 0;
  var postSum = 0;

  for (var i = 0; i < tableLength; i++) {
    var columnIndex = i + 1;
    var prePt = $(
      '#hero-radarTable tbody tr:nth-child(' +
        columnIndex +
        ') td:nth-child(' +
        preIndex +
        ') div:nth-child(1) > span:nth-child(1)'
    ).text();
    var postPt = $(
      '#hero-radarTable tbody tr:nth-child(' +
        columnIndex +
        ') td:nth-child(' +
        postIndex +
        ') div:nth-child(1) > span:nth-child(1)'
    ).text();

    // Parse Int
    prePt = parseInt(prePt);
    postPt = parseInt(postPt);

    if (isNaN(prePt) || isNaN(postPt)) {
      $('#hero-radarTable tbody tr:nth-child(' + columnIndex + ') td:nth-child(5)').html('-');
    } else if (prePt == 0) {
      // 분모가 0인 경우
      $('#hero-radarTable tbody tr:nth-child(' + columnIndex + ') td:nth-child(5)').html('-');
    } else if (postPt == 100) {
      // 퍼펙트 게임
      $('#hero-radarTable tbody tr:nth-child(' + columnIndex + ') td:nth-child(5)').html(
        '<span class="perfect">Perfect<span>'
      );
    } else {
      preSum += prePt;
      postSum += postPt;
      var resultCellHtml = getResultCellHtml(prePt, postPt);
      $('#hero-radarTable tbody tr:nth-child(' + columnIndex + ') td:nth-child(5)').html(resultCellHtml);
    }
  }
  //	preIndex 보다 post Index가
  // append 때문에 누적되므로 remove로 지운다.
  $("#hero-radarTable tbody tr td[colspan='5']").parent().remove();
  var preTitle = $('#hero-radarTable thead th:nth-child(' + preIndex + ')').text();
  var postTitle = $('#hero-radarTable thead th:nth-child(' + postIndex + ')').text();
  if (postSum == 0) {
    var comment = '<span>--%</span>';
  } else {
    var comment = getResultCellHtml(preSum, postSum);
  }
  $('#hero-radarTable tbody').append(
    '<tr><td colspan="5"><span>' +
      preTitle +
      '</span>보다 <span>' +
      postTitle +
      '</span>이 ' +
      comment +
      ' 플레이를 했습니다.</td></tr>'
  );
}

//결과 열에 사용될 요소를 생성합니다.
//span1은 ▲▼, span2는 수치를 대입합니다.
function getResultCellHtml(pre, post) {
  var span_1 = '-';
  var span_2 = 0;
  var span_3 = '%';

  var pre = parseFloat(pre);
  var post = parseFloat(post);
  var diffValue = post - pre;

  // (post - pre)/pre // pre가 기준이다. pre 보다 얼마나 성장했냐
  if (diffValue < 0) {
    span_1 = '<span style="color: DeepSkyBlue">▼';
  } else if (diffValue > 0) {
    span_1 = '<span style="color: red">▲';
  }
  span_2 = ((Math.abs(diffValue) * 100) / pre).toFixed(0);

  if (span_2 == 0) {
    span_1 = '<span style="color: Chartreuse">-';
  }

  return span_1 + '</span>' + '<span>' + span_2 + '</span><span>' + span_3 + '</span>';
}

//99이하 소수점 2자리, 999이하 소수점 1자리, 이상은 소수점 x
function roundVal(value) {
  if (value == null) {
    return null;
  }

  var value = parseFloat(value);
  if (value < 10) {
    value = (Math.round(value * 100) / 100).toFixed(2); // 소수점 두자리까지
  } else if (10 <= value && value <= 999) {
    value = (Math.round(value * 10) / 10).toFixed(1); // 소수점 한자리까지
  } else {
    value = Math.round(value);
  }
  return value;
}

// '한줄 요약 설정'
function getTableResultAvg(labels, selectedHeroId, periodId) {
  var preSum = 0;
  var preNum = 0;
  var postSum = 0;
  var postNum = 0;
  for (var i = 0; i < labels.length; i++) {
    prePt = getStat(selectedHeroId, 'radarPt', 'avg', i);
    postPt = getStat(selectedHeroId, 'radarPt', periodId, i);

    if (prePt != null) {
      preSum += prePt;
      preNum += 1;
    }

    if (postPt != null) {
      postSum += prePt;
      postNum += 1;
    }
  }

  return [preSum / preNum, postSum / postNum];
}

// 마지막행 '한줄 요약' 설정
function createTableResult(resultAvgArr) {
  var preAvg = Math.round(resultAvgArr[0]);
  var postAvg = Math.round(resultAvgArr[1]);

  var diffAvg = postAvg - preAvg;
  if (diffAvg > 0) {
    return '<td colspan="5"> 평소보다 ' + diffAvg + '점 향상된 플레이를 했습니다.</th>';
  } else if (diffAvg < 0) {
    return '<td colspan="5"> 평소보다 ' + diffAvg + '점 하락한 플레이를 했습니다.</th>';
  } else {
    return '<td colspan="5"> 평소처럼 플레이를 했습니다.</th>';
  }
}

function addPtLabel(pt) {
  if (pt != '-') {
    return '<span>' + pt + '</span><span>점</span>';
  } else {
    return pt;
  }
}

//z-data 출력
function createDataTable(selectedHeroId) {
  $('.tableWrapper').text('');

  if (!checkUpdate(hero, 'avg')) {
    var detailDatas = window.stats['All']['zData'][selectedHeroId];
    for (var ctgKey in detailDatas) {
      if (ctgKey != 'etcData') {
        //Create Table
        $('.tableWrapper').append(
          //Table Head
          '<table class="table table-condensed"><thead>' +
            '<tr class="accordion-toggle" data-toggle="collapse" data-target="#' +
            ctgKey +
            '">' +
            '<th>' +
            ctgKey +
            '</th>' +
            '<th><i class="indicator glyphicon glyphicon-chevron-up pull-right"></i></th>' +
            '</thead>' +
            //Table Body
            '<tbody><tr><td colspan="2">' +
            '<div class="collapse" id="' +
            ctgKey +
            '">' +
            '<table class="table table-striped table-hover">' +
            '</table></div></td></tr></tbody></table>'
        );
        //Set Header
        var datas = detailDatas[ctgKey];
        for (var key in datas) {
          $('#' + ctgKey + ' table').append('<tr><td>' + key + '</td><td>' + datas[key] + '</td></\tr>');
        }
      }
    }
  }
}

function setPtRatingStarNull(elementId) {
  $('#' + elementId).rateYo('rating', 0);
}

function setPtRatingNumNull(elementId, hero, period) {
  $('#' + elementId).text('--');
}

// Deprecated
//function setWinRating(hero, period, updateFlag){
//	if(updateFlag){
//		// Set Average Data
//		$('#avgWinRating > span').remove();
//		if(!checkUpdate(hero, 'avg')){
//			// Set Bar Average Data to zero
//			setWinRatingBarNull('avgWinRating');
//			// Set Number Average Data to zero
//			setWinRatingNumNull('avgWinRatingNum');
//
//		} else {
//			// Set Bar Average Data
//			setWinRatingBar('avgWinRating', hero, 'avg');
//			// Set Number Average Data
//			setWinRatingNum('avgWinRatingNum', hero, 'avg');
//		}
//	}
//
//	// Set Period Data
//	$('#prdWinRating > span').remove();
//	if(!checkUpdate(hero, period)){
//		// Set Bar Period Data to zero
//		setWinRatingBarNull('prdWinRating');
//		setWinRatingNumNull('prdWinRatingNum');
//	} else {
//		// Set Bar Period Data
//		setWinRatingBar('prdWinRating', hero, period);
//		setWinRatingNum('prdWinRatingNum', hero, period);
//	}
//}

//승률 Bar Chart
function setWinRatingBar(elementId, hero, period) {
  var totalGame = window.stats[hero]['winRating'][period][0];
  var winGame = window.stats[hero]['winRating'][period][1];
  var drawGame = window.stats[hero]['winRating'][period][2];
  var loseGame = window.stats[hero]['winRating'][period][3];
  var winRate = window.stats[hero]['winRating'][period][4];

  $('#' + elementId + ' > #success')
    .css('width', winRate + '%')
    .text(winGame + '승');
  $('#' + elementId + ' > #danger')
    .css('width', 100 - winRate + '%')
    .text(loseGame + '패');
}

function setWinRatingBarNull(elementId) {
  $('#' + elementId).append('<span>No Game</span>');
  $('#' + elementId + ' > #success')
    .css('width', '0%')
    .text('경기');
  $('#' + elementId + ' > #danger')
    .css('width', '0%')
    .text('경기');
}

// 승률 text
function setWinRatingNum(elementId, hero, period) {
  // animate
  var target = window.stats[hero]['winRating'][period][4];
  //	$("#" + elementId + "> div > #value").text( target);
  //	console.log("elementId : [" + elementId + "]" + ", hero : [" + hero + "]" + ", period : [" + period + "]" + ", target : [" + target + "]");
  $('#' + elementId).animateNumber({ number: target }, 500);
}

function setWinRatingNumNull(elementId) {
  $('#' + elementId).text('--');
}

//After Http Loading

/** Title Data **/
//Json 값이 null 일때 이걸 사용한다.
//'검색된 사용자가 없습니다' 등등 Display

//Title Battle Tag
function setBattleTag(btg) {
  var btg = decodeURI(btg);
  // btg = btg.replace("-", "#");
  btg = btg.split('-')[0];
  $('#battleTag').text(btg);
}

function setBattleTagImage() {
  var iconUrl = getEtcData('iconUrl');
  iconUrl = 'url("' + iconUrl + '")';
  $('#mainTitleImg').css('background-image', iconUrl);
}

function getEtcData(label) {
  return getStat('All', 'zData', 'All', 'etcData', label);
}

function setMostData(order, heroId) {
  //	var playTime = getStat(heroId, 'update', 'avg');
  var imgUrl = getHeroImgUrl(heroId);
  var heroName = getHeroName(heroId);

  // 승률에 관한것.
  var winGame = getStat(heroId, 'winRating', 'avg', 1);
  var loseGame = getStat(heroId, 'winRating', 'avg', 3);
  var drawGame = getStat(heroId, 'winRating', 'avg', 2);
  var winRating = getStat(heroId, 'winRating', 'avg', 4);

  //평점
  var ptRating = getStat(heroId, 'ptRating', 'avg');
  ptRating = ptRating.toFixed(1);

  //KDA
  var kdaDeath = getStat('All', 'zData', heroId, '전투', '목숨당 처치');
  kdaDeath = parseFloat(kdaDeath).toFixed(2);

  //폭주
  var burnedTime = getStat('All', 'zData', heroId, '게임', '폭주 시간');
  var playTime = getStat('All', 'zData', heroId, '게임', '치른 게임');
  if (burnedTime != null && playTime != null) {
    burnedTime = calcBurnedTime(burnedTime, playTime);
  }

  // 영웅이미지와 이름
  $('#most' + order + ' > td:nth-child(1) > div:nth-child(1)').css('background-image', imgUrl); // Set Hero Image
  $('#most' + order + ' > td:nth-child(1)  > div:nth-child(2)').text(heroName); // set Hero Text

  // 승률
  $('#most' + order + ' > td:nth-child(2) > div:nth-child(1)').text(winRating + '%'); // 승률
  $('#most' + order + ' > td:nth-child(2) > div:nth-child(2)').text(winGame + '/' + loseGame + '/' + drawGame); // 승/무/패

  //
  $('#most' + order + ' > td:nth-child(3)').text(ptRating); // 평점

  $('#most' + order + ' > td:nth-child(4)').text(kdaDeath); // KDA

  $('#most' + order + ' > td:nth-child(5)').text(burnedTime); // 폭주시간
}

//Set Update Tag on HeroContainer
function setUpdateBadge(period) {
  //	for(hero in window.stats){
  //		if(checkUpdate(hero, period)){
  ////			$("#" + hero).addClass("update");
  ////			$("#" + hero + "> .update").text("U");
  //			$("#" + hero + " > span:nth-child(1)").css("visibility", "visible");
  //		} else {
  //
  ////			$("#" + hero).removeClass("update");
  //			$("#" + hero + " > span:nth-child(1)").css("visibility", "hidden");
  //		}
  //	}

  for (hero in window.stats) {
    var updateNum = getStat(hero, 'update', period);
    updateNum = parseInt(updateNum);
    if (updateNum >= 1) {
      $('#' + hero + ' > span:nth-child(1)').text('+' + updateNum);
      //			$("#" + hero + " > span:nth-child(1)").text(updateNum + "경기");
    } else {
      $('#' + hero + ' > span:nth-child(1)').text('');
    }
  }
}

/**
 *
 *  Utility
 *
 **/

function calcBurnedTime(burnedTime, playTime) {
  var times = burnedTime.split(':');
  var totalBurnedTime_s = 0;
  if (times.length == 1) {
    totalBurnedTime_s = parseInt(times[0]);
  } else if (times.length == 2) {
    totalBurnedTime_s = parseInt(times[0]) * 60 + parseInt(times[1]);
  } else if (times.length == 3) {
    totalBurnedTime_s = parseInt(times[0]) * 3600 + parseInt(times[1]) * 60 + parseInt(times[2]);
  }
  var avgBurnedTime_s = totalBurnedTime_s / playTime;
  var burnedTime_m = avgBurnedTime_s / 60;
  var burnedTime_s = avgBurnedTime_s % 60;

  burnedTime_m = parseInt(burnedTime_m);
  burnedTime_s = parseInt(burnedTime_s);

  if (burnedTime_m > 0) {
    return burnedTime_m + '분' + burnedTime_s + '초';
  } else if (burnedTime_m == 0) {
    return burnedTime_s + '초';
  }
}

//get param from Get Method
function getQueryParam(param) {
  var result = window.location.search.match(new RegExp('(\\?|&)' + param + '(\\[\\])?=([^&]*)'));

  return result ? result[3] : false;
}

function checkUpdate(hero, prdIndex) {
  if (getStat(hero, 'update', prdIndex) > 0) {
    return true;
  } else {
    return false;
  }
}

function displayLoadingScreen(bool) {
  if (bool == true) {
    $('#updateBtn').addClass('disabled'); // 갱신하기 버튼 비활성화.

    //로딩화면 띄우기
    $('#radarCanvas').removeClass('fade-in').addClass('fade-out');
    $('#radarLoading').removeClass('fade-out').addClass('fade-in');
  } else {
    $('#updateBtn').removeClass('disabled');
    $('#radarLoading').removeClass('fade-in').addClass('fade-out');
    $('#radarCanvas').removeClass('fade-out').addClass('fade-in');
  }
}

//get Selected Period
function getSelectedPeriod() {
  var selectedPeriod;
  $('.heroPeriodBtn')
    .siblings()
    .each(function () {
      if ($(this).hasClass('active')) {
        var periodId = $(this).attr('id');
        //			// Button에 따른 Index 형성
        if (periodId == 'weekBtn') {
          selectedPeriod = 'week';
        } else if (periodId == 'todayBtn') {
          selectedPeriod = 'today';
        } else if (periodId == 'yesterDayBtn') {
          selectedPeriod = 'ystday';
        }
        return false;
      }
    });
  return selectedPeriod;
}

function getSelectedHeroId() {
  var selectedHeroId;
  $('.heroList div.heroContainer')
    .siblings()
    .not('.heroList div.roleContainer')
    .each(function () {
      if ($(this).hasClass('active')) {
        selectedHeroId = $(this).attr('id');
        return false;
      }
    });
  return selectedHeroId;
}

function getSelectedTierId() {
  var selectedTier;

  $('.tierSelectBtn')
    .siblings()
    .each(function () {
      if ($(this).hasClass('active')) {
        var tierId = $(this).attr('id');
        //			// Button에 따른 Index 형성
        if (tierId == 'bronzeBtn') {
          selectedTier = 'bronze';
        } else if (tierId == 'silverBtn') {
          selectedTier = 'silver';
        } else if (tierId == 'goldBtn') {
          selectedTier = 'gold';
        } else if (tierId == 'platinumBtn') {
          selectedTier = 'platinum';
        } else if (tierId == 'diaBtn') {
          selectedTier = 'dia';
        } else if (tierId == 'masterBtn') {
          selectedTier = 'master';
        } else if (tierId == 'grandMasterBtn') {
          selectedTier = 'grandMaster';
        }
      }
    });
  return selectedTier;
}

function getStats(btg, loc, device, isSample) {
  // // Get Data from Default DB
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  // StatDatas Onready State
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      responseProcessing(this.responseText); // xmlhttp.response type은 text와 xml만 가능하다.
    }
  };

  // Send xmlHttp
  xmlhttp.open('GET', '/assets/archives/ggez/responses/1.json', true);
  xmlhttp.send();
}

function makeUrlQuery(urlKey, urlValue) {
  return '&' + urlKey + '=' + urlValue;
}

function responseProcessing(response) {
  var response = JSON.parse(response);

  if (!validResponse(response)) return;

  // 첫방문에는 안내메세지를 보내준다.
  if (response['isFirstVisit'] == true) {
    alert(getAlertMessage('notice_first_visit'));
  }

  window.stats = response['dataResult'];
  window.tiers = response['tierResult'];
  console.log(window.stats);
  console.log(window.tiers);
  window.updateStatsReady = true;
}

function validResponse(response) {
  // response가 정상적으로 decode되지 않았으면 null을 반환한다.
  if (response == null) {
    alert(getAlertMessage('err_cant_recieve_data_1'));
    return false;
  }

  if (response['status'] == undefined) {
    alert(getAlertMessage('err_cant_recieve_data_2'));
    return false;
  }

  if (response['errFlag'] == true) {
    // 에러가 있는 경우...

    var errCode = response['error']['errCode'];
    var errMessage = response['error']['errMessage'];
    if (errCode == 2) {
      alert(getAlertMessage('err_user_not_exists'));
      window.location = '/';
    } else {
      alert('에러코드 [' + response['error']['errCode'] + ']가 발생했습니다. 관리자에게 문의해주세요.');
      window.location = '/';
    }

    console.log(response);
    return false;
  }

  // 유저데이터를 전역변수에 저장한다.
  if (response['dataResult'] == undefined) {
    alert(getAlertMessage('err_stats_undefined'));
    return false;
  }

  if (response['dataResult'] == null) {
    alert(getAlertMessage('err_stats_null'));
    return false;
  }

  return true;
}

function getAlertMessage(error_id) {
  // error Map
  if (error_id == 'err_cant_recieve_data_1') return '서버에서 데이터를 가져오지 못했습니다. : 1';
  else if (error_id == 'err_cant_recieve_data_2') return '서버에서 데이터를 가져오지 못했습니다. : 2';
  else if (error_id == 'err_user_not_exists')
    return '오버워치에 존재하지 않는 배틀태그입니다. 영문은 대소문자를 구분합니다. 배틀태그를 확인하여 주세요';
  else if (error_id == 'err_stats_undefined') return 'stats가 undefined입니다.';
  else if (error_id == 'err_stats_null') return 'stats의 값이 null입니다.';
  // notice Map
  else if (error_id == 'notice_first_visit')
    return '환영합니다. 첫방문이시네요. 이시각 이후로 플레이한 게임이 분석에 반영됩니다.';
}

// updateCompetitivePoint()
function updateCptPoint() {
  var cptPoint = window.stats['All']['cptPt']['avg'];
  $('#cptPointNum').text(cptPoint);
}

function updateMostData(mostHeroes) {
  //	$("#most1 > div:nth-child(2)").text(window.stats[most1]['update']['avg']);
  if (mostHeroes[0] != null) {
    setMostData(1, mostHeroes[0]);
  }

  if (mostHeroes[1] != null) {
    setMostData(2, mostHeroes[1]);
  }

  if (mostHeroes[2] != null) {
    setMostData(3, mostHeroes[2]);
  }
}

function runUpdateStatsThread(waitTime, timeout) {
  // 흐름제어변수
  window.updateStatsReady = false;

  var counter = 0;
  var timer = setInterval(function () {
    // updateStatsReady가 true가 되려면 validResponse()와 responsePrecessing()을 거친다.
    if (counter > waitTime && window.updateStatsReady === true) {
      try {
        initUpdateStats();
      } catch (error) {
        console.error(error);
      }

      $('.tab-loading').addClass('fade-out');
      $('.tab-loading').css('z-index', '-1');
      $('.tab-content').removeClass('fade-out');
      clearInterval(timer);
    }

    // 응답시간 만료
    if (counter > timeout) {
      console.log('응답시간이 만료되었습니다.');
      clearInterval(timer);
    }

    counter++;
  }, 100);
}

//조금 개선이 필요한듯.
//알고리즘이 너무 늘어뜨려서 작성했음.
//간결하고 쉽게 다시 작성할 것.
function getMostHero() {
  var stats = window.stats;

  var most1;
  var most2;
  var most3;

  for (var hero in stats) {
    if (hero != 'All') {
      var heroPlayTime = stats[hero]['update']['avg'];
      heroPlayTime = parseInt(heroPlayTime);

      if (heroPlayTime != 0) {
        if (most1 == null) {
          most1 = hero;
        } else if (most1 != null) {
          var most1PlayTime = stats[most1]['update']['avg'];
          most1PlayTime = parseInt(most1PlayTime);
          if (most1PlayTime < heroPlayTime) {
            most3 = most2;
            most2 = most1;
            most1 = hero;
          } else {
            if (most2 == null) {
              most2 = hero;
            } else if (most2 != null) {
              var most2PlayTime = stats[most2]['update']['avg'];
              most2PlayTime = parseInt(most2PlayTime);
              if (most2PlayTime < heroPlayTime) {
                most3 = most2;
                most2 = hero;
              } else {
                if (most3 == null) {
                  most3 = hero;
                } else if (most3 != null) {
                  var most3PlayTime = stats[most3]['update']['avg'];
                  most3PlayTime = parseInt(most3PlayTime);
                  if (most3PlayTime < heroPlayTime) {
                    //										console.log("most3PlayTime " + most3PlayTime +", heroPlayTime " + heroPlayTime);
                    most3 = hero;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  var mosts = [most1, most2, most3];

  return mosts;
}

function getHeroName(hero) {
  switch (hero) {
    case 'Genji':
      return '겐지';
    case 'Reaper':
      return '리퍼';
    case 'McCree':
      return '맥크리';
    case 'Soldier76':
      return '솔져76';
    case 'Sombra':
      return '솜브라';
    case 'Tracer':
      return '트레이서';
    case 'Pharah':
      return '파라';
    case 'Mei':
      return '메이';
    case 'Bastion':
      return '바스티온';
    case 'Widowmaker':
      return '위도우메이커';
    case 'Junkrat':
      return '정크랫';
    case 'Torbjoern':
      return '토르비욘';
    case 'Hanzo':
      return '한조';
    case 'DVa':
      return '디바';
    case 'Reinhardt':
      return '라인하르트';
    case 'Roadhog':
      return '로드호그';
    case 'Winston':
      return '윈스턴';
    case 'Zarya':
      return '자리야';
    case 'Lucio':
      return '루시우';
    case 'Mercy':
      return '메르시';
    case 'Symmetra':
      return '시메트라';
    case 'Ana':
      return '아나';
    case 'Zenyatta':
      return '젠야타';

    default:
      return 'all';
  }
}

/** Utility for Image Handling **/
//이미지 file name을 정의합니다.
function getTierImgFileName(cptPoint) {
  var grade = '';

  if (1 <= cptPoint && cptPoint <= 1499) {
    grade = 'bronze';
  } else if (1500 <= cptPoint && cptPoint <= 1999) {
    grade = 'silver';
  } else if (2000 <= cptPoint && cptPoint <= 2499) {
    grade = 'gold';
  } else if (2500 <= cptPoint && cptPoint <= 2999) {
    grade = 'platinum';
  } else if (3000 <= cptPoint && cptPoint <= 3499) {
    grade = 'dia';
  } else if (3500 <= cptPoint && cptPoint <= 3999) {
    grade = 'master';
  } else if (4000 <= cptPoint && cptPoint <= 5000) {
    grade = 'grandmaster';
  }
  grade += '-badge';

  return grade;
}

function getHeroImgUrl(heroId) {
  fileName = 'icon-' + heroId.toLowerCase();
  return getImgUrl(fileName, 'png');
}

function getImgUrl(fileName, imgType) {
  return 'url("/assets/archives/ggez/img/' + fileName + '.' + imgType + '")';
}

//배열에서 찾고자 하는 key가 정의되지 않았을 경우 점검하여 null을 return 하는 역할을 하는 함수입니다.
//note : 자바스크립트는 오버로딩을 지원하지 않으므로 arguments를 배열로 이용하여 사용합니다.
//ex) getStat('All', 'cptPt', 'avg');
function getStat() {
  var args = arguments;
  var array = window.stats;

  for (var index in args) {
    var key = args[index];
    if (array[key] == undefined) {
      console.log('args : ' + args + ", 에서 '" + key + "'값이 undefined입니다.");
      return null;
    }
    array = array[key];
  }
  return array;
}

function getTierStat() {
  var args = arguments;
  var array = window.tiers;

  for (var index in args) {
    var key = args[index];
    if (array[key] == undefined) {
      console.log('get tier 메쏘드에서 알립니다. args : ' + args + ", 에서 '" + key + "'값이 undefined입니다.");
      return null;
    }
    array = array[key];
  }
  return array;
}

//Select First Period & Hero
function initActive(period, id, tierBtnId) {
  $('#' + id).addClass('active');
  $('#' + period).addClass('active');
  $('#' + tierBtnId).addClass('active');
}

/** Dispaly Config **/
function initStarRating() {
  $('.fiveStar').rateYo({
    starWidth: '25px',
    readOnly: true,
  });
}

function initChrt() {
  // Chart Plugin
  //		Chart.plugins.register({
  //			  beforeDraw: function(chartInstance) {
  //			    var ctx = chartInstance.chart.ctx;
  //			    ctx.fillStyle= "rgba(0,0,0,0.1)";
  //			    ctx.fillRect(50, 50, chartInstance.chart.width, chartInstance.chart.height);
  //			  }
  //			});

  var labels = ['', '', '', '', '', ''];
  var datas = [];

  // Create Default Chart
  var ctx = document.getElementById('radarCanvas').getContext('2d');
  window.radarCharts = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true, // true:fit to width, false : fit to height;
      title: {
        display: true,
        //			            text: '냅둬라날#3934의 경기요약'
      },
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          fontColor: 'white',
        },
      },
      tooltips: {
        enabled: true,
        mode: 'index',
        intersect: true, //false means always applied
        custom: function (tooltip) {
          if (!tooltip) {
            return;
          }
        },
      },
      scale: {
        reverse: false,
        gridLines: {
          color: '#708090', // 외곽라인
          lineWidth: 1.5,
        },
        angleLines: {
          //	방사형 직선라인
          color: '#7FFFD4',
          lineWidth: 2,
        },
        pointLabels: {
          // 라벨 사이즈
          fontColor: 'white',
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          fontStyle: 'normal',
          fontSize: 12,
        },
        ticks: {
          // Step Label
          fontSize: 15,
          fontColor: 'rgba(204,204,204,1)', // gray
          backdropColor: 'rgba(204,204,204,0)',
          min: 0,
          max: 100,
          stepSize: 20,
          beginAtZero: true,
        },
      },
      //		            hover: {
      //						mode: 'index',
      //						intersect: false,
      //		            }
    },
  });
}

/**
 *	Relate to Trend Panel
 */

function getSelTrendBtnId() {
  var selTrendBtnId;

  $('.trendBtn')
    .siblings()
    .each(function () {
      if ($(this).hasClass('active')) {
        selTrendBtnId = $(this).attr('id');
        return false;
      }
    });

  return selTrendBtnId;
}

function getIndex(btnId) {
  var preIndex = 'avg';
  var postIndex = 'avg';

  if (btnId == 'trend-ystBtn') {
    preIndex = 'ystday';
    postIndex = 'today';
  } else if (btnId == 'trend-todayBtn') {
    preIndex = 'today';
    postIndex = 'avg';
  } else if (btnId == 'trend-weekBtn') {
    preIndex = 'week';
    postIndex = 'avg';
  }

  return [preIndex, postIndex];
}

function setTrendButtonLabel() {
  var ystPlayTime = getStat('All', 'update', 'ystday');
  var todayPlayTime = getStat('All', 'update', 'today');
  var weekPlayTime = getStat('All', 'update', 'week');

  $('#trend-ystBtn > div:nth-child(2)').text(returnNoGame(ystPlayTime));
  $('#trend-todayBtn > div:nth-child(2)').text(returnNoGame(todayPlayTime));
  $('#trend-weekBtn > div:nth-child(2)').text(returnNoGame(weekPlayTime));
}

function returnNoGame(value) {
  if (value == null || value == 0) {
    return 'No game';
  } else {
    return value + ' 경기';
  }
}

function setTrendLabel(btnId) {
  var preLabel = '평균';
  var postLabel = '--';

  if (btnId == 'trend-ystBtn') {
    postLabel = '어제';
  } else if (btnId == 'trend-todayBtn') {
    postLabel = '오늘';
  } else {
    postLabel = '주간';
  }

  $('.trend-preLabel').map(function () {
    $(this).text(preLabel);
  });

  $('.trend-postLabel').map(function () {
    $(this).text(postLabel);
  });
}

function setTrendCptLabel(btnId) {
  var preLabel = '--';
  var postLabel = '--';

  if (btnId == 'trend-ystBtn') {
    preLabel = '어제시작';
    postLabel = '어제마무리';
  } else if (btnId == 'trend-todayBtn') {
    preLabel = '오늘시작';
    postLabel = '현재';
  } else {
    preLabel = '1주일전';
    postLabel = '현재';
  }

  $('#trend-preCptLabel').text(preLabel);
  $('#trend-postCptLabel').text(postLabel);
}

//Competitive Rating Update
function setTrendCpt(preIndex, postIndex) {
  // Check Update가 NULL이면 게임을 하지 않았으므로 NOGAME을 반환한다.
  //	if(!checkUpdate('All', preIndex)){
  //		$("#trend-cptPtPrefix").css("color", "White").text("-");
  //		$("#trend-diffCptPt").text("No");
  //		$("#trend-preCptPt").text( '---');
  //		$("#trend-postCptPt").text('---');
  //		return;
  //	}

  var preValue = getStat('All', 'cptPt', preIndex);
  var postValue = getStat('All', 'cptPt', postIndex);

  //▲▼ pre,postvalue중 값이 하나라도 null이면 계산이 불가능하다.
  if (preValue == null || postValue == null) {
    if (preValue == null) {
      preValue = '----';
    }
    if (postValue == null) {
      postValue = '----';
    }
    $('#trend-cptPtPrefix').css('color', 'white ').text('-');
    $('#trend-diffCptPt').text('---');
    $('#trend-preCptPt').text(preValue);
    $('#trend-postCptPt').text(postValue);
  } else {
    var diffValue = postValue - preValue;
    setTrendPrefix('trend-cptPtPrefix', diffValue);
    diffValue = Math.abs(diffValue);

    $('#trend-diffCptPt').text(diffValue);
    $('#trend-preCptPt').text(preValue);
    $('#trend-postCptPt').text(postValue);
  }
}

function setTrendPtRating(preIndex, postIndex) {
  var most3Heroes = getMostHero();
  setPtRatingByElem('trend-prePtRatingStar', 'trend-prePtRatingNum', 'All', preIndex, most3Heroes);
  setPtRatingByElem('trend-postPtRatingStar', 'trend-postPtRatingNum', 'All', postIndex, most3Heroes);
}

function setPtRatingByElem(elemRatingId, elemNumId, heroId, periodId, most3Heroes) {
  if (!checkUpdate(heroId, periodId)) {
    setPtRatingStarNull(elemRatingId);
    setPtRatingNumNull(elemNumId);
  } else {
    var value = getMost3AvgPt(most3Heroes, periodId);
    if (value == 0) {
      setPtRatingStarNull(elemRatingId);
      setPtRatingNumNull(elemNumId);
    } else {
      setPtRatingStar(elemRatingId, heroId, periodId, most3Heroes, value);
      setPtRatingNum(elemNumId, heroId, periodId, most3Heroes, value);
    }
  }
}

function getMost3AvgPt(most3Heroes, periodId) {
  var num = 0;
  var sum = 0;
  for (var i = 0; i < 3; i++) {
    var heroID = most3Heroes[i];
    if (heroID != null) {
      if (checkUpdate(heroID, periodId)) {
        num += 1;
        sum += window.stats[heroID]['ptRating'][periodId];
      }
    }
  }
  var value = 0;
  if (num != 0) {
    value = sum / num;
  }
  value = (Math.round(value * 100) / 100).toFixed(2); // 소수점 두자리까지
  return value;
}

function setPtRatingStar(elementId, hero, period, most3Heroes, value) {
  $('#' + elementId).rateYo('rating', value);
}

function setPtRatingNum(elementId, hero, period, most3Heroes, value) {
  rating = value * 10;
  var decimal_places = 1;
  var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10;

  $('#' + elementId).animateNumber(
    {
      number: rating,

      numberStep: function (now, tween) {
        var floored_number = Math.floor(now) / decimal_factor,
          target = $(tween.elem);
        if (decimal_places > 0) {
          floored_number = floored_number.toFixed(1);
        }

        target.text(floored_number);
      },
    },
    500
  );
}

// deprecated
function setPtRating(hero, period, updateFlag, most3Heroes) {
  if (updateFlag) {
    if (!checkUpdate(hero, 'avg')) {
      setPtRatingStarNull('avgPtRatingStar');
      setPtRatingNumNull('avgPtRatingNum');
    } else {
      setPtRatingStar('avgPtRatingStar', hero, 'avg');
      setPtRatingNum('avgPtRatingNum', hero, 'avg');
    }
  }
  if (!checkUpdate(hero, period)) {
    setPtRatingStarNull('prdPtRatingStar');
    setPtRatingNumNull('prdPtRatingNum');
  } else {
    setPtRatingStar('prdPtRatingStar', hero, period);
    setPtRatingNum('prdPtRatingNum', hero, period);
  }
}

// 일정한 규칙을 이용해서 간단히 만들 수 있을 것같은데.
function setTrendWinRating(preIndex, postIndex) {
  setWinRatingByElem('trend-preWinRating', 'trend-preWinRatingNum', 'All', preIndex);
  setWinRatingByElem('trend-postWinRating', 'trend-postWinRatingNum', 'All', postIndex);
}

// RatingBar ID, 숫자ID, 영웅이름, 기간 ID 순으로 변수를 입력.
function setWinRatingByElem(elemRatingId, elemNumId, heroId, periodId) {
  $('#' + elemRatingId + ' > span').remove();

  if (!checkUpdate(heroId, periodId)) {
    setWinRatingBarNull(elemRatingId); // Set Bar Average Data to zero
    setWinRatingNumNull(elemNumId); // Set Number Average Data to zero
  } else {
    setWinRatingBar(elemRatingId, heroId, periodId);
    setWinRatingNum(elemNumId, heroId, periodId);
  }
}

function setTrendBurnedTime(preIndex, postIndex) {}
function setTrendKDA(preIndex, postIndex) {}

function setTrendPrefix(elementId, diffValue) {
  if (diffValue == 0) {
    $('#' + elementId)
      .css('color', 'Chartreuse ')
      .text('→');
  } else if (diffValue > 0) {
    $('#' + elementId)
      .css('color', 'red')
      .text('▲');
  } else if (diffValue < 0) {
    $('#' + elementId)
      .css('color', '#668cff')
      .text('▼');
  }
}

/**
 * Update Period Data
 */

//기간 변경 버튼을 누를때는 flag를 false로, hero change 버튼일때는 flag를 true로 놓았다.
//flag가 false이면 기간만 변하는 것이므로, average데이터를 변경하지 않는다.
//개선이 필요함.. 직관적이지 않음.
// 최초 한번만 업데이트가 필요하다면 initUpdateStats() 메쏘드로 가세요.
function updateHeroData(updateFlag) {
  var periodId = getSelectedPeriod();
  var tierId = getSelectedTierId();
  var heroId = getSelectedHeroId();

  // update label
  setFixedBtmLabel(heroId, periodId);
  setRadarChartLabel(periodId);
  setRadarTableLabel(periodId);
  setRadarTableTierLabel(tierId); // radar legend & radar table thead
  setTierSelectSubTitle(heroId); // Update subTitle(hero) : 다른티어 평균 선택하기

  // update Play Time(게임횟수) label
  //    updatePlayTimeLabel(heroId);

  // update Tier Player Number label
  updateTierNum(heroId);

  // Update Badge
  setUpdateBadge(periodId);

  // Radar Chart Update
  setRadarChart(heroId, periodId, tierId);

  // Table Update
  setRadarTableData(heroId, periodId, tierId);
  // column-5 결과열 업데이트 + resultComment 업데이트
  updateResultColumn();

  // Win Rating Chart Update
  //	setWinRating(heroId, periodId, updateFlag); // 사용전에 必 elem id 변경할 것.trend와 겹침 (Deprecated) setWinRatingbyElem 사용할것
  // Point Bar Chart Update
  //	setPtRating(heroId, periodId, updateFlag); // 사용전에 必 elem id 변경할 것.trend와 겹침

  /** Detail Data **/
  //	setDetailData(heroId);
  //	createDataTable(heroId);
}

function updateTierNum(heroId) {
  $('#bronzeBtn > div:nth-child(2)').text(getTierStat('bronze', heroId, 'playerNum', 0) + '명');
  $('#silverBtn > div:nth-child(2)').text(getTierStat('silver', heroId, 'playerNum', 0) + '명');
  $('#goldBtn > div:nth-child(2)').text(getTierStat('gold', heroId, 'playerNum', 0) + '명');
  $('#platinumBtn > div:nth-child(2)').text(getTierStat('platinum', heroId, 'playerNum', 0) + '명');
  $('#diaBtn > div:nth-child(2)').text(getTierStat('dia', heroId, 'playerNum', 0) + '명');
  $('#masterBtn > div:nth-child(2)').text(getTierStat('master', heroId, 'playerNum', 0) + '명');
  $('#grandMasterBtn > div:nth-child(2)').text(getTierStat('grandMaster', heroId, 'playerNum', 0) + '명');
}

function updatePlayTimeLabel(heroId) {
  // 개선 필요.
  // ParseInt를 하고 아래 returnNoGame에서 isNaN함수를 이용해서 NULL 처리를 하는게 좋아보임.
  var ystPlayTime = getStat(heroId, 'update', 'ystday');
  var todayPlayTime = getStat(heroId, 'update', 'today');
  var weekPlayTime = getStat(heroId, 'update', 'week');

  $('#yesterDayBtn > div:nth-child(2)').text(returnNoGame(ystPlayTime));
  $('#todayBtn > div:nth-child(2)').text(returnNoGame(todayPlayTime));
  $('#weekBtn > div:nth-child(2)').text(returnNoGame(weekPlayTime));
}

// 영웅 선택은 그대로이고, 티어선택이 변경되었을때만 활성화 되는 함수
// 예를들어 테이블은 그때그때마다 생성되므로 이 함수를 사용하면 안된다.
function updateTierData() {
  var periodId = getSelectedPeriod();
  var tierId = getSelectedTierId();
  var heroId = getSelectedHeroId();

  // prepare data
  var radarRaw = window.tiers[tierId][heroId]['radarRaw'];
  var radarPt = window.tiers[tierId][heroId]['radarPt'];

  // update label
  setRadarTableTierLabel(tierId);

  // update radar chart
  window.radarCharts.data.datasets[2].data = radarPt;
  window.radarCharts.update();

  // update table data
  setRadarTableData(heroId, periodId, tierId);
}

/** Deprecated 
//SubTitle Label Update
function setPrdLabel(period){
	if(period == 'week'){
		$(".prdLabel").map(function() {
			return $( this ).text("주간 요약 경기");
		})
		
		// 경쟁전 점수
		$("#prdAdvLabel").text("1주전");
		$("#todayAdvLabel").text("오늘");
//		prdAdvLabel
	} else if (period == 'ystday'){
		$(".prdLabel").map(function() {
			return $( this ).text("어제 종합");
		})
		// 경쟁전 점수
		$("#prdAdvLabel").text("어제시작");
		$("#todayAdvLabel").text("어제마무리");
	} else {
		$(".prdLabel").map(function() {
			return $( this ).text("오늘 경기");
		})
		// TODO: 날짜 계산하는 거 넣어야 할듯.
		$("#prdAdvLabel").text("하루전");
		$("#todayAdvLabel").text("오늘");
	}
}
function setTrendWinRating(preIndex, postIndex){
	// Derpecated	
	// remove no game tag
		$('#avgWinRating > span').remove();
		$('#prdWinRating > span').remove();
		if(!checkUpdate('All', preIndex)){
			setWinRatingBarNull('trend-preWinRating'); // Set Bar Average Data to zero
			setWinRatingNumNull('trend-preWinRatingNum'); // Set Number Average Data to zero
		}  else {
			setWinRatingBar('trend-preWinRating', 'All', preIndex);
			setWinRatingNum('trend-preWinRatingNum', 'All', preIndex);
		}
		
		if(!checkUpdate('All', postIndex)){
			setWinRatingBarNull('trend-postWinRating'); // Set Bar Average Data to zero
			setWinRatingNumNull('trend-postWinRatingNum'); // Set Number Average Data to zero
		}  else {
			setWinRatingBar('trend-postWinRating', 'All', postIndex);
			setWinRatingNum('trend-postWinRatingNum', 'All', postIndex);
		}
};
**/
