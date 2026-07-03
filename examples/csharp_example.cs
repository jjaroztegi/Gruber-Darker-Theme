using System;

var account = new BankAccount("Ada", 1000);
account.MakeWithdrawal(500, DateTime.Now, "Rent payment");
Console.WriteLine(account.GetAccountHistory());

var giftCard = new GiftCardAccount("Grace", 100, 50);
giftCard.MakeWithdrawal(20, DateTime.Now, "Coffee beans");
giftCard.PerformMonthEndTransactions();

var savings = new InterestEarningAccount("Linus", 1000);
savings.MakeDeposit(50, DateTime.Now, "Birthday money");
savings.PerformMonthEndTransactions();

var lineOfCredit = new LineOfCreditAccount("Morgan", 0, 2000);
lineOfCredit.MakeWithdrawal(750, DateTime.Now, "Emergency trip");
lineOfCredit.MakeDeposit(250, DateTime.Now, "Partial refund");
lineOfCredit.PerformMonthEndTransactions();

Console.WriteLine(giftCard.Balance);
Console.WriteLine(savings.Balance);
Console.WriteLine(lineOfCredit.Balance);
Console.WriteLine(lineOfCredit.GetAccountHistory());
