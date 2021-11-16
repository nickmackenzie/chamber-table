//getMemberListing = async () => {
//    let logo;
//    let city;
//    let street;
//    let postalCode;
//    let province;
//    let description;
//    let website;
//    let phone;
//    let email;

//  const response = await fetch("https://localhost:44391/api/Members/MemberList", { })
//        .then((response) => response.json())
//        .then((data) => {
//            console.log(data);
//        });
//};

imageNotFound = (img) => {
    img.src = "https://www.pecchamber.com/files/images/PECCoC-Logo-FINAL.jpg";
};

$(document).ready(async function () {
    //await getMemberListing();
    const memberTable = $("#memberListingTable").DataTable({
        responsive: true,
        destroy: true,
        //processing: true,

        // data: memberListingTableData,
        ajax: {
            //url: "https://localhost:44391/api/Members/MemberList",
            url: "https://localhost:44391/api/Members/MemberList",
            type: "POST",
            data: { ViewID: "4158003000001121018" },
            dataSrc: function (json) {
                let i = 0;
                let return_data = new Array();
                for (let i = 0; i < json.Data.length; i++) {
                    let logo;
                    let city;
                    let street;
                    let postalCode;
                    let province;
                    let description;
                    let website;
                    let phone;
                    let email;
                    let instagram;
                    let facebook;
                    let linkedIn;
                    let twitter;

                    console.log(json.Data[i].Instagram);
                    if (
                        json.Data[i].Membership_Type == "Marketing Membership" ||
                        json.Data[i].Membership_Type == "Leadership Member"
                    ) {
                        description =
                            json.Data[i].Description != null
                                ? `<p>${json.Data[i].Description}</p>`
                                : `N/A `;
                    } else {
                        description = "";
                    }
                    logo = json.Data[i].Logo_URL
                        ? `<img width="100px" src="https://www.pecchamber.com/files/images/MembersLogos/${json.Data[i].Logo_URL}" onerror="imageNotFound(this)" />`
                        : "<img src='https://www.pecchamber.com/files/images/PECCoC-Logo-FINAL.jpg' />";

                    city =
                        json.Data[i].Shipping_City != null
                            ? json.Data[i].Shipping_City + ","
                            : "";

                    street =
                        json.Data[i].Shipping_Street != null
                            ? json.Data[i].Shipping_Street
                            : "";

                    website = json.Data[i].Website
                        ? `<a class='link-primary' href='${json.Data[i].Website}' target='_blank' data-toggle='tooltip' data-placement='top' title=${json.Data[i].Website}><i class="las la-globe la-2x"></i></a>`
                        : "";

                    email = json.Data[i].Email
                        ? `<a class='link-primary' href='mailto:${json.Data[i].Email}' data-toggle='tooltip' data-placement='top' title=${json.Data[i].Email}><i class="las la-at la-2x"></i></a>`
                        : "";

                    instagram = json.Data[i].Instagram
                        ? `<a class='link-primary' href='${json.Data[i].Instagram}'  data-toggle="tooltip" data-placement="top" title="${json.Data[i].Instagram}"><i id="instagramIcon" class="lab la-instagram la-2x"></i></i></a>`
                        : "";
                    facebook = json.Data[i].Facebook
                        ? `<a class='link-primary' href='${json.Data[i].Facebook}' data-toggle="tooltip" data-placement="top" title="${json.Data[i].Facebook}"><i id="facebookIcon" class="lab la-facebook-square la-2x"></i></a>`
                        : "";
                    linkedIn = json.Data[i].LinkedIn
                        ? `<a class='link-primary' href=':${json.Data[i].LinkedIn}' data-toggle="tooltip" data-placement="top" title="${json.Data[i].LinkedIn}"><i id="linkedinIcon" class="lab la-linkedin la-2x"></i></a>`
                        : "";
                    twitter = json.Data[i].Twitter
                        ? `<a class='link-primary' href='${json.Data[i].Twitter}' data-toggle="tooltip" data-placement="top" title="${json.Data[i].Twitter}"><i id="twitterIcon" class="lab la-twitter-square la-2x"></i></a>`
                        : "";

                    province = json.Data[i].Shipping_State
                        ? json.Data[i].Shipping_State
                        : "";

                    phone = json.Data[i].Phone
                        ? `<a class='link-primary' href='tel:${json.Data[i].Phone}' data-toggle="tooltip" data-placement="top" title="${json.Data[i].Phone}"><i class="las la-phone la-2x"></i></a>`
                        : "";

                    membershipLevel = json.Data[i].MemberShipLevel
                        ? json.Data[i].MemberShipLevel
                        : "";

                    membershipType = json.Data[i].Membership_Type;

                    let googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${json.Data[i].Account_Name}+${street}+${city}`;

                    shopping = json.Data[i].Shopping
                        ? `<a class='link-primary' href="3"><i class="las la-shopping-cart la-2x"></i></a>`
                        : "";

                    let addressNotFormatted = `<address>${street}<br />${city} ${json.Data[i].Shipping_State}<br />${json.Data[i].Shipping_Code}</address>`;

                    googleMap = `<a href='${googleMapsURL}' data-toggle='tooltip' html='true' data-placement='top' title='${street} ${city} ${json.Data[i].Shipping_State}' target='_blank'><i class="las la-directions la-2x"></i></i></a>`;

                    // `< div class='container' > ${ street } ${ json.Data[i].Shipping_State } ${ city } <br /> ${ json.Data[i].Shipping_Code }</div > `

                    let address = `
                      <address><div class='container d-flex align-items-center businessBox'>
                        <div class='m-1' style="min-width: 100px;">${logo}</div><br />
                          <div class='container'>
                            <strong class='mt-2 sans'>${json.Data[i].Account_Name}</strong><br>
                            <span>Category: ${json.Data[i].Directory_Category}</span>
                            <span class='text-muted address'>
                            ${city} ${province}<br></span>
                            ${membershipType}
                            <div class='d-flex justify-content-right mt-2'>
                            ${website}
                            ${email}
                            ${phone}
                            ${googleMap}
                            ${shopping}
                            </div>
                             <div>                            
                            ${instagram}
                            ${facebook}
                            ${linkedIn}
                            ${twitter}

                          
                            </div>                                                 
                          </div>
                        </div>
                      </address>`;

                    let membershipLevelSort;

                    if (membershipType == "Leadership Member") {
                        membershipLevelSort = 1;
                    } else if (membershipType == "Marketing Membership") {
                        membershipLevelSort = 2;
                    } else {
                        membershipLevelSort = 3;
                    }
                    return_data.push({
                        companyName: address,
                        category: json.Data[i].Directory_Category
                            ? `<p>${json.Data[i].Directory_Category}</p>`
                            : "N/A",
                        description: description,
                        city:
                            json.Data[i].Shipping_City != null
                                ? json.Data[i].Shipping_City
                                : "",
                        addressNotFormatted: addressNotFormatted,
                        membershipLevel: membershipLevel,
                        membershipLevelSort: membershipLevelSort,
                        categories: json.Data[i].Directory_Categories,

                        phone: json.Data[i].Phone
                            ? `<a href='tel:${json.Data[i].Phone}'>${json.Data[i].Phone}</a>`
                            : "",
                        email: json.Data[i].Email
                            ? `<a href='mailto:${json.Data[i].Email}' data-toggle='tooltip' data-placement='top' title=${json.Data[i].Email}>${json.Data[i].Email}</a>`
                            : "",

                        additionalInformation: json.Data[i].Additional_Information
                            ? json.Data[i].Additional_Information
                            : "",
                    });
                }
                return return_data;
            },
        },

        language: {
            loadingRecords: `<div class="cssload-loader"></div>`,
            info: "Showing page _PAGE_ of _PAGES_",
        },

        dom: "f<'test d-flex flex-column flex-md-row justify-content-between' B<'align-self-center toolbar text-center'>>Prt<'d-flex justify-content-between 'ip>",
        columns: [
            {
                className: "details-control",
                data: null,
                defaultContent: "",
                autoWidth: false,
                ordering: false,
                width: "20%",
            },
            {
                title: "Business",
                width: "80%",
                data: "companyName",
                class: "all",
            },
            { title: "", data: "description", class: "none" },
            { title: "Category", data: "category", class: "none" },

            { title: "City", data: "city", class: "none" },
            {
                title: "Address",
                data: "addressNotFormatted",
                class: "none address",
            },
            {
                title: "Membership Level",
                data: "membershipLevel",
                class: "none address",
            },
            { title: "Tags", data: "categories", class: "none address" },
            { title: "Phone", data: "phone", class: "none address" },
            { title: "Email", data: "email", class: "none address" },
            { title: "", data: "membershipLevelSort" },
        ],
        order: [
            [10, "asc"],
            [1, "asc"],
        ],
        buttons: {
            dom: {
                button: {
                    tag: "button",
                    className: "btn btn-primary btn-sm mr-2",
                },
            },
        },
        searchPanes: {
            order: ["City", "Category", "Tags"],
        },
        columnDefs: [
            { orderable: false, targets: 0 },
            {
                searchPanes: {
                    show: false,
                },
                targets: [0, 1],
            },
            {
                searchPanes: {
                    show: true,
                    visible: false,
                },
                targets: [2],
            },
            {
                searchPanes: {
                    show: true,
                },
                visible: false,
                targets: [4],
            },
            {
                searchPanes: {
                    show: true,
                },
                visible: false,
                targets: [7],
            },
            {
                searchPanes: {
                    show: false,
                },
                visible: false,
                targets: [6],
            },
            {
                searchPanes: {
                    show: false,
                },
                visible: false,
                targets: [10],
            },
        ],
    });

    new $.fn.dataTable.Buttons(memberTable, {
        dom: {
            button: {
                tag: "button",
                className: "btn btn-primary",
                type: "button",
            },
        },
        buttons: [
            {
                text: "Filter",
                attr: {
                    id: "spButton",
                    "data-toggle": "collapse",
                    "data-target": "#spCont",
                    "aria-expanded": "false",
                    "aria-Controls": "collapseExample",
                },
            },
        ],
    });

    memberTable.buttons(1, null).container().appendTo($("div.test"));

    memberTable.searchPanes
        .container()
        .insertAfter(".test")
        .addClass("collapse")
        .addClass("container")
        .addClass("border")
        .addClass("rounded")
        .addClass("bg-white")
        .addClass("p-4")
        .addClass("mt-3")
        .addClass("shadow-sm")
        .attr("id", "spCont");
});

$(document).on("shown.bs.tab", function (e) {
    $(window).trigger("resize");
});

$(window).resize(function () {
    var table = $("#memberListingTable").DataTable();
    table.columns.adjust().draw();
});
