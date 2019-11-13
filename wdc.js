/**
 * Retrieves CreatorIQ historical data for a given token
 * and returns it (or just the schema) in the format needed by
 * a Tableau Web Data Connector
 *
 */

// eslint-disable-next-line prefer-arrow-callback
$(function() {

	//event handlers
	function submitButtonOnClick()
	{
		try
		{
			tableau.connectionName = 'CreatorIQ data connection';

			//store the form data because the submit causes it to disappear
			var formData = {"ticker":$('#report_name').val(),
											"token":$('#token').val(),
			                "startdate":$("#startdate").val(),
			                "enddate":$("#enddate").val()}
			tableau.connectionData = JSON.stringify(formData);
			tableau.submit();
		}
		catch(error)
		{
			alert("There was a problem using the Tableau web data connector javascript library. " + error);
		}
	}

	// tableau web data connector functionality
	try
	{
		var myConnector = tableau.makeConnector();

		// Define the schema
		myConnector.getSchema = function(schemaCallback) {
			var cols = [{id:"Retweets",
				alias:"Retweets",
				dataType:tableau.dataTypeEnum.string},
				{id:"PostDate",
					alias:"PostDate",
					dataType:tableau.dataTypeEnum.string},
				{id:"Saves",
					alias:"Saves",
					dataType:tableau.dataTypeEnum.string},
				{id:"PostStatus",
					alias:"PostStatus",
					dataType:tableau.dataTypeEnum.string},
				{id:"SMV",
					alias:"SMV",
					dataType:tableau.dataTypeEnum.string},
				{id:"ThumbLogoURL",
					alias:"ThumbLogoURL",
					dataType:tableau.dataTypeEnum.string},
				{id:"Engagement",
					alias:"Engagement",
					dataType:tableau.dataTypeEnum.string},
				{id:"SwipeUps",
					alias:"SwipeUps",
					dataType:tableau.dataTypeEnum.string},
				{id:"PostLink",
					alias:"PostLink",
					dataType:tableau.dataTypeEnum.string},
				{id:"StickerTaps",
					alias:"StickerTaps",
					dataType:tableau.dataTypeEnum.string},
				{id:"LogoURL",
					alias:"LogoURL",
					dataType:tableau.dataTypeEnum.string},
				{id:"BrandName",
					alias:"BrandName",
					dataType:tableau.dataTypeEnum.string},
				{id:"Followers",
					alias:"Followers",
					dataType:tableau.dataTypeEnum.string},
				{id:"Comments",
					alias:"Comments",
					dataType:tableau.dataTypeEnum.string},
				{id:"PostType",
					alias:"PostType",
					dataType:tableau.dataTypeEnum.string},
				{id:"CampaignName",
					alias:"CampaignName",
					dataType:tableau.dataTypeEnum.string},
				{id:"TotalShares",
					alias:"TotalShares",
					dataType:tableau.dataTypeEnum.string},
				{id:"AvgEngagementRate",
					alias:"AvgEngagementRate",
					dataType:tableau.dataTypeEnum.string},
				{id:"FlagshipProperty",
					alias:"FlagshipProperty",
					dataType:tableau.dataTypeEnum.string},
				{id:"PublisherId",
					alias:"PublisherId",
					dataType:tableau.dataTypeEnum.string},
				{id:"Clicks",
					alias:"Clicks",
					dataType:tableau.dataTypeEnum.string},
				{id:"LinkingStatus",
					alias:"LinkingStatus",
					dataType:tableau.dataTypeEnum.string},
				{id:"PublisherName",
					alias:"PublisherName",
					dataType:tableau.dataTypeEnum.string},
				{id:"CampaignId",
					alias:"CampaignId",
					dataType:tableau.dataTypeEnum.string},
				{id:"Views",
					alias:"Views",
					dataType:tableau.dataTypeEnum.string},
				{id:"SocialHandle",
					alias:"SocialHandle",
					dataType:tableau.dataTypeEnum.string},
				{id:"Reach",
					alias:"Reach",
					dataType:tableau.dataTypeEnum.string},
				{id:"EngagementRate",
					alias:"EngagementRate",
					dataType:tableau.dataTypeEnum.string},
				{id:"LastUpdated",
					alias:"LastUpdated",
					dataType:tableau.dataTypeEnum.string},
				{id:"CreatorId",
					alias:"CreatorId",
					dataType:tableau.dataTypeEnum.string},
				{id:"TapsBack",
					alias:"TapsBack",
					dataType:tableau.dataTypeEnum.string},
				{id:"SocialNetwork",
					alias:"SocialNetwork",
					dataType:tableau.dataTypeEnum.string},
				{id:"Likes",
					alias:"Likes",
					dataType:tableau.dataTypeEnum.string},
				{id:"DateSubmitted",
					alias:"DateSubmitted",
					dataType:tableau.dataTypeEnum.string},
				{id:"Replies",
					alias:"Replies",
					dataType:tableau.dataTypeEnum.string},
				{id:"FlagshipSocialNetwork",
					alias:"FlagshipSocialNetwork",
					dataType:tableau.dataTypeEnum.string},
				{id:"Post",
					alias:"Post",
					dataType:tableau.dataTypeEnum.string},
				{id:"PostId",
					alias:"PostId",
					dataType:tableau.dataTypeEnum.string},
				{id:"FollowersAtTimeOfPost",
					alias:"FollowersAtTimeOfPost",
					dataType:tableau.dataTypeEnum.string},
				{id:"Impressions",
					alias:"Impressions",
					dataType:tableau.dataTypeEnum.string}]
		};

		// will add this later
		// myConnector.getSchema = function(schemaCallback)
		// {
		// 	var formData = JSON.parse(tableau.connectionData);
		// 	var url = "fetch_history.php?type=schema&ticker=" + formData["ticker"];
		// 	$.getJSON(url,function (data){ schemaCallback([data]); });
		// };

		myConnector.getData = function(table, doneCallback)
		{
			var formData = JSON.parse(tableau.connectionData);
			var url = "https://api.creatoriq.com/rest/view/data?requestData%5Btake%5D=1&requestData%5Bskip%5D=4&requestData%5Bparams%5D%5BYear%5D=2019&requestData%5Bparams%5D%5BMonth%5D=11&type=schema&view=Reports%2FCampaignsByNetwork%2FCampaignsPosts";
			$.getJSON(url,function(data)
			{
				table.appendRows(data);
				doneCallback();
			});
		};
		tableau.registerConnector(myConnector);
	}
	catch(error)
	{
		alert("There was a problem loading the Tableau web data connector javascript library.");
	}

	//onload functionality
	function wdcInitialize()
	{
		//show/hide warning message
		$('#tableau-warning-msg').hide();
		if (typeof tableauVersionBootstrap  == 'undefined' || !tableauVersionBootstrap)
		{
			$('#tableau-warning-msg').show();
		}

		//set up event handler for submit button
		$("#submitButton").click(submitButtonOnClick);
	}
	$(document).ready(wdcInitialize);
});
