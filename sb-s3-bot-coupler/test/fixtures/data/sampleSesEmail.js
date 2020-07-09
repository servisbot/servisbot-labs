/* eslint-disable max-len, no-tabs */
module.exports = `Return-Path: <test@servisbot.com>
Received: from mail-ed1-f48.google.com (mail-ed1-f48.google.com [209.85.208.48])
 by inbound-smtp.us-east-1.amazonaws.com with SMTP id 82d6u9ms42o1g11adqbrn9jq4r3oi32a5365so01
 for support@betterchatbots.com;
 Tue, 12 May 2020 20:22:21 +0000 (UTC)
X-SES-Spam-Verdict: PASS
X-SES-Virus-Verdict: PASS
Received-SPF: pass (spfCheck: domain of servisbot.com designates 209.85.208.48 as permitted sender) client-ip=209.85.208.48; envelope-from=test@servisbot.com; helo=mail-ed1-f48.google.com;
Authentication-Results: amazonses.com;
 spf=pass (spfCheck: domain of servisbot.com designates 209.85.208.48 as permitted sender) client-ip=209.85.208.48; envelope-from=test@servisbot.com; helo=mail-ed1-f48.google.com;
 dkim=pass header.i=@servisbot.com;
 dmarc=none header.from=servisbot.com;
X-SES-RECEIPT: AEFBQUFBQUFBQUFHM2szVW45aFlianVEb0xuQWdZWExpcjUzTGRDOFVTd2MxSGp1QjV1dHcyZ3pUempvUmRZckloa0NwQmJSZG13cnJsMlJkWVFBNCtpa1YxcWZmc1VJS2owTk1rMWU3VWEvbldCTGlZQXVzM3BScmY5a1h3YklDWmVDWTEzUnNZMEZSMzlIQ3pOYTVkRENUcXhmRzdGTk5zNDB6bEV5bnJ6dFVRT3Rhc053azZibm8zdlVkZU12RXpjbHZZUGw3ZWNjZGVvL1h0NlJQVVFOcm0ydkhXSUlDZWFUMm1PSXlwb0JQRXZmME1RSjEwa1JnaHJ6blJJQnVUWXBpaEVmc0hod0M3ZTUxOUI0Rjhqam4xc2pzR0F0Sm5Yck5FQThnUnI4S2FUYWJxNzYvYlE9PQ==
X-SES-DKIM-SIGNATURE: a=rsa-sha256; q=dns/txt; b=IdDqgdL0drSEgCajYAvrt5VrfuOd7d7BBvyW4ObBThqDZABDi9IahW+4TBgiSji2/foN6U5IMLroa2oJRxgDZEp0rBfe6S0W/WBIktkGcHmAkGU7p+1f2+m6IACdD/Qd7sVIsqewH1fh1Ue7LgvSJKaFqo/ndZjMwx+TfIOq0sY=; c=relaxed/simple; s=224i4yxa5dv7c2xz3womw6peuasteono; d=amazonses.com; t=1589314941; v=1; bh=1Ln2KUQuzce7U1SmIMH1c/ujzrrS+tCORxjLaDxXZqE=; h=From:To:Cc:Bcc:Subject:Date:Message-ID:MIME-Version:Content-Type:X-SES-RECEIPT;
Received: by mail-ed1-f48.google.com with SMTP id h15so9935191edv.2
        for <support@betterchatbots.com>; Tue, 12 May 2020 13:22:21 -0700 (PDT)
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
        d=servisbot.com; s=google;
        h=mime-version:from:date:message-id:subject:to;
        bh=1Ln2KUQuzce7U1SmIMH1c/ujzrrS+tCORxjLaDxXZqE=;
        b=REWpFvCQmx0SzD4o5fYyBY19SUKhz+vZuc4CGyO4lvwq6kTP6JeomPGkJly5ybtFJ+
         z153FDSpzVyY3FLqvtOjYTosf2Gpha7cngq8vz/01bsG9EZCMpW6PpI/MMfD/TnfQQrt
         IFZZUElPHrdfo4ODbGDi26QqGTW9rFzQD1A6E=
X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
        d=1e100.net; s=20161025;
        h=x-gm-message-state:mime-version:from:date:message-id:subject:to;
        bh=1Ln2KUQuzce7U1SmIMH1c/ujzrrS+tCORxjLaDxXZqE=;
        b=TN6v4MT6XTYkkkgPPE1B9+fCJVK2+g+308FnHsIzFm4tDz/rZ6MdvtVPyAnVVEGX0y
         Kic6sZXn9a59E0JAz4Uv8PABoEomTdtFTbjigSnfFqdD8G6F2wvesl2mJSAAx9QgPNsS
         YCE5w5b813SXy82e5g/i538JN4TQDcbuDpd4YhCpkO9YG0qhpwK7236SLNHsFxFm7wC/
         vOXqwanzimM8evVqPijaGaZtiTQXV4xak31MfkibzaTQbpzHMZpR0TuLPsR0D+Pf75qB
         HljohGJjF/gQrUgH+Rf36qnUCerYSakkm6tZ0a9ams/aVH41/UEegD/bNTzIoqfqLKsg
         qSEA==
X-Gm-Message-State: AGi0PubJ1vIEVuEnA9d/wlVr2iLiOawsJCtouoNrpvukGL7F1CeM9esT
	cIbljpnlS+RpiKLanIHNuihIjanc79ADH42U91VxiPl4
X-Google-Smtp-Source: APiQypK55aEbwFLaHS03S0XpqdkWA4mxKU1OwEQ/wg0fjIAg8K1r9efChiQDZYnrfs3u1cK6kHJJck2hwYsORx1Jx00=
X-Received: by 2002:aa7:c0d1:: with SMTP id j17mr19900545edp.308.1589314939958;
 Tue, 12 May 2020 13:22:19 -0700 (PDT)
MIME-Version: 1.0
From: test <test@servisbot.com>
Date: Tue, 12 May 2020 16:22:09 -0400
Message-ID: <CACjQ5Ee3HHRmT340Nuf+jbVnT5EYyFVaMXmEMqTt2kbr-nEBww@mail.gmail.com>
Subject: this is a subject
To: support@betterchatbots.com
Content-Type: multipart/alternative; boundary="0000000000006ed02805a57938f5"

--0000000000006ed02805a57938f5
Content-Type: text/plain; charset="UTF-8"

this is the body

--0000000000006ed02805a57938f5
Content-Type: text/html; charset="UTF-8"

<div dir="ltr">this is the body</div>

--0000000000006ed02805a57938f5--`;
