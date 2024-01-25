function escapeHTML(str) {
	return str.replace(/[&<>"'\/]/g, function (match) {
		switch (match) {
			case '&': return '&amp;';
			case '<': return '&lt;';
			case '>': return '&gt;';
			case '"': return '&quot;';
			case "'": return '&#x27;';
			case '`': return '&#x60;';
			case '=': return '&#x3D;';
			case '/': return '&#x2F;';
			default: return match;
		}
	});
}

var code = null;
var vanity = null;

var default_logo = null;
var default_name = null;
var default_description = null;
var default_inputs = null;
var default_buttons = null;

$(document).ready(function() {
	$('#invitelink').keypress(keyPressHandler);
	$('#reset').on('click', resetHandler);
	$('#checklink').on('click', checkLinkHandler);
	$('#home').on('click', homeHandler);
	
	default_logo = $("#logo").attr('src');
	default_name = $('#name').html();
	default_description = $('#description').html();
	default_inputs = $('#inputs').html();
	default_buttons = $('#buttons').html();
	
	$('#invitelink').focus();
});

function checkLinkHandler() {
	if (code != null) {
		const vanity = $('#vanity').val();
		
		if (!vanity || vanity.length < 1) {
			return;
		}
		
		$.ajax({ 
			type: 'POST', 
			url: 'create',
			dataType: 'json',
			data: {
				code: code,
				vanity: vanity
			},
			success: function (data) { 
				if (data.success) {
					successPopup(data.success);
					
					$('#inputs').html('<input id="created" type="text" spellcheck="false" value="' + window.location.href + data.vanity + '" onclick="copy(this)" readonly><input id="deletelink" type="text" spellcheck="false" value="' + window.location.href + 'delete/' + data.vanity + '/' + data.hash + '" onclick="copy(this)" readonly>');
					$('#buttons').html('<button id="reset" type="button">Reset</button>');
					
					$('#reset').on('click', resetHandler);
				}
				
				else if (data.error) {
					errorPopup(data.error);
				}
			},
			error: function (error) { 
				errorPopup('An error occurred while creating the invite link. Please try again later.');
			}
		});
	}
	
	else if (!$('#checklink').prop('disabled')) {
		$('#invitelink').prop('disabled', true);
		$('#checklink').prop('disabled', true);
		
		const invitelink = $('#invitelink').val();
		const regex = /^(?:(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord\.com\/invite)\/)?([\w-]+)$/i
		const match = invitelink.match(regex);
		
		if (!match || match.length < 1) {
			$('#invitelink').prop('disabled', false);
			$('#checklink').prop('disabled', false);
			
			return errorPopup('Please enter a valid invite link or vanity.');
		}
		
		$.ajax({ 
			type: 'GET', 
			url: 'https://discord.com/api/v8/invites/' + match[1],
			dataType: 'json',
			success: function (data) { 
				if (data.code && data.code != 0 && data.code != 10006) {
					code = data.code;
					
					if (data.guild.icon) {
						$("#logo").attr('src', 'https://cdn.discordapp.com/icons/' + data.guild.id + '/' + data.guild.icon + '.png');
					}
					
					else {
						$("#logo").attr('src', 'https://cdn.discordapp.com/embed/avatars/1.png');
					}
					
					if (data.guild.name) {
						$('#name').html(escapeHTML(data.guild.name));
					}
					
					else {
						$('#name').html('No name');
					}
					
					if (data.guild.description) {
						$('#description').html(escapeHTML(data.guild.description));
					}
					
					else {
						$('#description').html('No description');
					}
					
					$('#inputs').html('<div class="vanity-container"><p>' + window.location.href + '</p><input id="vanity" class="vanity" type="text" spellcheck="false" placeholder="vanity"></div>');
					$('#vanity').keypress(keyPressHandler);
					$("#checklink").html('Create invite link');
					$('#checklink').prop('disabled', false);
					
					$("#vanity").focus();
				}
				
				else {
					$('#invitelink').prop('disabled', false);
					$('#checklink').prop('disabled', false);
					
					$("#invitelink").val('');
					$("#invitelink").focus();
					
					errorPopup('This invitation link is invalid.');
				}
			},
			error: function (error) { 
				$('#invitelink').prop('disabled', false);
				$('#checklink').prop('disabled', false);
				
				$("#invitelink").val('');
				$("#invitelink").focus();
				
				errorPopup('This invitation link is invalid.');
			}
		});
	}
}

function resetHandler() {
	code = null;
	vanity = null;
	
	$("#logo").attr('src', default_logo);
	$('#name').html(default_name);
	$('#description').html(default_description);
	$('#inputs').html(default_inputs);
	$('#buttons').html(default_buttons);
	$('#invitelink').prop('disabled', false);
	$('#checklink').prop('disabled', false);
	
	$('#invitelink').keypress(keyPressHandler);
	$('#reset').on('click', resetHandler);
	$('#checklink').on('click', checkLinkHandler);
	
	$('#invitelink').focus();
}

function homeHandler() {
	window.location.href = '/';
}

function keyPressHandler(e) {
	if (e.which == 13) {
		$('#checklink').click();
	}
}

function copy(e) {
	e.select();
	e.setSelectionRange(0, 99999);
	
	navigator.clipboard.writeText(e.value);
	
	successPopup('Link has been copied to the clipboard.');
}

function errorPopup(error) {
	new SnackBar({
		message: error,
		status: 'error',
		timeout: 3000,
		position: 'br'
	});
}

function successPopup(success) {
	new SnackBar({
		message: success,
		status: 'success',
		timeout: 3000,
		position: 'br'
	});
}

