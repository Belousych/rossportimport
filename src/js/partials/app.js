$(document).ready(function(){
	tag();
	star();
	teamToggle();
});

var tag = function () {
	var $tag = $('.js-tag');
	$tag.on('click', function(){
		var $this = $(this);
		$this.toggleClass('active');
	});
}

var star = function () {
	var $star = $('.star'),
		$starToggle = $('.js-star-toggle');
	$star.on('click', function(){
		var $this = $(this);
		$this.toggleClass('star_active');
	});
	$starToggle.on('click', function(){
		var $this = $(this),
			$txt = $(this).text();
		
		if ($txt == 'Добавить в избранное') {
			$this.text('Убрать из избранного');
		} else {
			$this.text('Добавить в избранное');
		}
		$this.prev($star).toggleClass('star_active');
	});
}

var teamToggle = function () {
	var $teamItem = $('.js-team'),
		$teamCont = $('.js-team-txt'),
		$heightArr = [];
	
	$teamCont.each(function(){
		var $this = $(this),
			$height = $this.outerHeight();
		$heightArr.push($height);
		$this.hide().css({
			'left' : 0,
			'visibility' : 'visible'
		})
	});
	
	$teamItem.each(function(){
		var $this = $(this),
			$thisCont = $this.find($teamCont),
			$id = $this.index();
		$this.on('click', function(){
			$teamCont.hide();
			$teamItem.css({
				'padding-bottom' : 0
			});
			$thisCont.slideDown('400');
			$this.css({
				'padding-bottom' : $heightArr[$id]
			})
			
			
		})
	});
}