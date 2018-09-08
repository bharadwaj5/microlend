'use strict';

/**
 * This is proposal transaction
 * @param {test.Proposal} proposal
 * @transaction
 */

function Proposal(proposal) {
    proposal.Id.desc = proposal.description;
    proposal.Id.desc = 'I have created an event requesting loan';
    proposal.Id.rate = 0;
   	proposal.Id.duedate = 0;
    var factory = getFactory();
    var nameSpace = 'test';

     return getAssetRegistry('test.bAccount').then(function(assetRegistry) {
        assetRegistry.update(proposal.Id);
    }).then(function() {
        var event = factory.newEvent('test','request');
        event.detail = proposal.description;
        event.acid = proposal.Id;
        event.amnt = proposal.amnt;
        event.Dur = proposal.dur;
        emit(event);
    });
}
 /**
  * This is loan transaction
  * @param {test.loan} loan
  * @transaction
  */

  function Loan(loan) {

    if(!(loan.Id.rate) == 0){
        throw 'Borrower has received amount';
    }else {
        if(loan.lendId.amt1 < loan.amount) {
            throw 'No sufficient amount in the account';
        }else {
            loan.lendId.count++;
            loan.lendId.amt1 -= loan.amount;
            loan.lendId.tlmnt += loan.amount;
            loan.Id.lamnt = loan.amount;
            loan.Id.rate = loan.rate;
            loan.Id.duedate = loan.duedate;
            loan.Id.n = loan.n;
            loan.Id.type = loan.type;
            loan.Id.desc = "I have taken loan from " + loan.lendId;
        }
    }

      return getAssetRegistry('test.lAccount').then(function(assetRegistry) {
          assetRegistry.update(loan.lendId);
          return getAssetRegistry('test.bAccount').then(function(assetregistry) {
              assetregistry.update(loan.Id);
         });
      });
  }

/**
 * This is urgent amount transaction
 * @param {test.urgAmt} urgamt
 * @transaction
 */

 function urgAmt(urgamt) {
    if(urgamt.lendId.amt1 < urgamt.amount1) {
        throw 'No sufficient amount in lender account';
    }else {
        urgamt.Id3.desc = urgamt.Description1;
        urgamt.Id3.amt += urgamt.amount1;
        urgamt.lendId.amt1 -= urgamt.amount1;
        urgamt.lendId.tlmnt += urgamt.amount1;
        urgamt.Id3.desc = "I have taken money from " + urgamt.lendId + " for use in emergency situation";
    }

    return getAssetRegistry('test.bAccount').then(function(assetRegistry) {
        assetRegistry.update(urgamt.Id3);
        return getAssetRegistry('test.lAccount').then(function(assetregistry) {
            assetregistry.update(urgamt.lendId);
        });
    });
 }

 /**
  * This is retreiving transaction
  * @param {test.retrieve} ret
  * @transaction
  */

  function Retrieve(ret) {

    var factory = getFactory();
    var p = ret.bAc.lamnt;
    var r = (ret.bAc.rate);
    var t = (ret.bAc.duedate);
    var n = (ret.bAc.n);
    var R = r/100;

    if(ret.bAc.type == "si" || ret.bAc.type == "sI" ||ret.bAc.type == "Si" ||ret.bAc.type == "SI"){
        var iamnt = p*(r/100)*(t);
        ret.bAc.desc = ret.statement;
        ret.lAc.amt1 += (ret.bAc.lamnt + iamnt);
        ret.bAc.amt -= iamnt;
    } else {
        var rn = 1+(R/n);
        var a = Math.pow(rn,(n*t));
        var A = p*a;
        ret.lAc.amt1 += A;
        var b = A-p;
        ret.bAc.amt -= b;
    }
 
    ret.bAc.lamnt = 0;
    ret.bAc.n = 0;
    ret.bAc.rate = 0;
    ret.bAc.duedate = 0;
    ret.bAc.type = " ";
    ret.bAc.desc = "Loan retrieved";
    ret.bAc.cnt++;
    ret.bAc.exp = 0;
    ret.bAc.rd = 0;
    ret.bAc.sal = 0;
    ret.bAc.adv = 0;
    ret.bAc.oth = 0;
    
    return getAssetRegistry('test.bAccount').then(function(assetregistry) {
        assetregistry.update(ret.bAc);
        return getAssetRegistry('test.lAccount').then(function(assetRegistry) {
        assetRegistry.update(ret.lAc);
		
		var event = factory.newEvent('test','rEvent');
        event.detail = "I have retrieved the money that I have borrowed";
        event.iden = ret.bAc;
        emit(event);
        });
    });            
}

/**
 * This is transfering money transaction
 * @param {test.l2l} l2l
 * @transaction
 */

 function Transfer(l2l) {
    if(l2l.from.amt1 < l2l.amount2) {
        throw 'No sufficient funds' ;
    } else {

        l2l.from.amt1 -= l2l.amount2;
        l2l.to.amt1 += l2l.amount2;

        return getAssetRegistry('test.lAccount').then(function(assetRegistry) {
            return assetRegistry.updateAll([l2l.from,l2l.to]);
        });
    }
 }

 /**
 * This is transfering money transaction
 * @param {test.l2b} l2b
 * @transaction
 */

function Transfer1(l2b) {
    if(l2b.from.amt1 < l2b.amount2) {
        throw 'No sufficient funds' ;
    } else {
        l2b.from.amt1 -= l2b.amount2;
        l2b.to.amt += l2b.amount2;

        return getAssetRegistry('test.lAccount').then(function(assetRegistry) {
            assetRegistry.update(l2b.from);
            return getAssetRegistry('test.bAccount').then(function(assetregistry) {
                assetregistry.update(l2b.to);
            });
        });
    }
 }

 /**
 * This is transfering money transaction
 * @param {test.b2b} b2b
 * @transaction
 */

function Transfer2(b2b) {
    if(b2b.from.amt1 < b2b.amount2) {
        throw 'No sufficient funds' ;
    } else {
        b2b.from.amt -= b2b.amount2;
        b2b.to.amt += b2b.amount2;

        return getAssetRegistry('test.bAccount').then(function(assetRegistry) {
            return assetRegistry.updateAll([b2b.from,b2b.to]);
        });
    }
 }


 /**
  * This is Account Manage transaction
  * @param {test.accountManage} accmng
  * @transaction
  */

  function Accmng(accmng) {
      accmng.bac.exp = accmng.exp;
      accmng.bac.rd = accmng.rd;
      accmng.bac.sal = accmng.sal;
      accmng.bac.adv = accmng.adv;
      accmng.bac.oth = accmng.oth;

      var add1 = accmng.exp + accmng.rd + accmng.sal + accmng.adv + accmng.oth;
      var add2 = accmng.bac.amt + accmng.bac.lamnt;

      if(add1 > add2) {
          throw 'Management error';
      }else {
          return getAssetRegistry('test.bAccount').then(function(assetregistry) {
              assetregistry.update(accmng.bac);
          });
      }
  }

/**
 * This is lendProposal transaction
 * @param {test.lendproposal} lproposal
 * @transaction
 */

 function lendProposal(lproposal){
     lproposal.bac.desc = lproposal.lac + " wants to give you loan at " + String(lproposal.rate) + "% rate of interest";
     return getAssetRegistry('test.bAccount').then(function(assetregistry) {
        assetregistry.update(lproposal.bac);
    });
 }

 /**
  * This is message transaction
  * @param {test.message} message
  * @transaction
  */
 function Message(message) {
     message.lac.msg = message.bac + " wants money from you";
     return getAssetRegistry('test.lAccount').then(function(assetregistry) {
        assetregistry.update(message.lac);
    });
 }
 
 /**
  * This is EMI transaction
  * @param {test.emi} emi
  * @transaction
  */
 function EMI(emi) {
     if(emi.bac.emiamt == 0){
        emi.bac.emiamt = emi.bac.lamnt;
     } 
     if(emi.bac.lamnt < 0){
         throw 'No due for loan';
     }
     var emiamt = emi.bac.emiamt;
     var rate = emi.bac.rate;
     var duedate = (emi.bac.duedate)*12;

     var monthlyInterestRatio = (rate/100)/12;
     var monthlyInterest = monthlyInterestRatio*(emi.bac.emiamt);
     var top = Math.pow((1+monthlyInterestRatio), duedate);
     var bottom = top-1;
     var sp = top/bottom;
     var Emi = (((emi.bac.emiamt)*monthlyInterestRatio)*sp);
     emi.bac.lamnt -= Emi;
     emi.lac.amt1 += Emi;
     var div = (emi.bac.duedate)*12;
     emi.bac.cnt += (1/div);
     
     return getAssetRegistry('test.lAccount').then(function(assetregistry) {
        assetregistry.update(emi.lac);
        return getAssetRegistry('test.bAccount').then(function(assetRegistry){
            assetRegistry.update(emi.bac);
        });
    });
 }

 /**
  * This is colateral transaction
  * @param {test.colateral} colateral
  * @transaction
  */
 function Colateral(colateral) {
     colateral.lac.assetId = colateral.assetId;
     colateral.bac.lamnt = 0;
     colateral.bac.rate = 0;
     colateral.bac.duedate = 0;
     colateral.bac.n = 0;
     colateral.bac.type = " ";
     return getAssetRegistry('test.lAccount').then(function(assetregistry) {
        assetregistry.update(colateral.lac);
        return getAssetRegistry('test.bAccount').then(function(assetRegistry){
            assetRegistry.update(colateral.bac);
        });
    });    
 }

 /**
  * This is cibil score transaction
  * @param {test.cibilsc} cibilsc
  * @transaction
  */
 function Cibil(cibilsc) {
     cibilsc.bac.cibil = cibilsc.cibil;
     return getAssetRegistry('test.bAccount').then(function(assetregistry) {
        assetregistry.update(cibilsc.bac);
    });
 }

/**
  * This is lenderDeposit transaction
  * @param {test.lenderDeposit} ldeposit
  * @transaction
  */

  function LDeposit(ldeposit) {
      ldeposit.lac.amt1 += ldeposit.Amount;
      return getAssetRegistry('test.lAccount').then(function(assetregistry){
          assetregistry.update(ldeposit.lac);
      });
  }

  /**
   * This is borrowerDeposit transaction
   * @param {test.borrowerDeposit} bdeposit
   * @transaction
   */

   function BDeposit(bdeposit) {
       bdeposit.bac.amt += bdeposit.Amount;
       return getAssetRegistry('test.bAccount').then(function(assetregistry) {
           assetregistry.update(bdeposit.bac);
       });
   }
