package com.phoenixrs.api.utils;

import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.sun.mail.smtp.SMTPTransport;

public class SendMail {

	public static boolean mailCritsend(String mail_from, String mail_to, String subject, String body, String tags)
			throws Exception {
		boolean flg;
		try {
			String mail_smtp_server = Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mailSmtpServer);
			final String login = Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mailUserName);
			final String pwd = Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mailPassword);
			int port = Lib.strToInteger(Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mailPort));
			String mail_auth = Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mailAuth);
			String is_debug = Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mailDebug);
//			String bcc = Lib.getReourcePropValue(Constants.mailConfigFileName, Constants.mail_bcc);

//					msg.addRecipient(Message.RecipientType.BCC, new InternetAddress("bertrand.letous@mxmtech.net"));
			Properties props = System.getProperties();
			props.put("mail.smtps.host", mail_smtp_server);
			props.put("mail.smtps.auth", mail_auth);
			props.put("mail.smtps.port", port);
			props.put("mail.debug", is_debug);
			Session session = Session.getInstance(props, null);
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress(mail_from));
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mail_to, false));
			msg.addRecipient(Message.RecipientType.BCC, new InternetAddress("lpham@phoenixrs.com"));
			msg.setSubject(subject);
			// msg.setText(body);
			msg.setContent(body, "text/html;charset=\"UTF-8\"");
			msg.setHeader("X-Mailer", "Header");
			// add custom tags
			msg.addHeader("X-Tag", tags + ",bulk");
			msg.setSentDate(new Date());
			SMTPTransport t = (SMTPTransport) session.getTransport("smtps");
			t.connect(mail_smtp_server, login, pwd);
			t.sendMessage(msg, msg.getAllRecipients());
			System.out.println("Response: " + t.getLastServerResponse());
			t.close();
			flg = true;
			System.out.println("SendMail:Message sent OK.");
		} catch (MessagingException e) {
			System.out.println("SendMail:Message sent NG.");
			e.printStackTrace();
			flg = false;
		}
		return flg;
	}
}
