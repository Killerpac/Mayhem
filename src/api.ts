import { createClient } from '@supabase/supabase-js';
import { Transaction } from './types/navigation';
import { supabase } from './initSupabase';


async function transferBalance(senderEmail: string, receiverEmail: string, amount: number, transaction: Transaction): Promise<{ success: boolean, error?: string }> {
  // Initialize Supabase client
  
  try {
    // Begin a transaction
    
    // Lock sender's row for update
    const { data: senderData, error: senderError } = await supabase
      .from('balance')
      .select('balance, transactions')
      .eq('email', senderEmail)
      .single();
      
    if (senderError) {
      throw new Error(senderError.message);
    }
    
    if (!senderData) {
      return { success: false, error: `User with email ${senderEmail} not found` };
    }
    
    // Check if sender has enough balance
    if (senderData.balance < amount) {
      return { success: false, error: 'Insufficient balance' };
    }
    
    // Update sender's balance and transactions
    const senderNewBalance = senderData.balance - amount;
    const senderNewTransactions = [
      ...senderData.transactions,
      transaction
    ]
    
    // Update sender's record in database
    const { error: senderUpdateError } = await supabase
      .from('balance')
      .update({
        balance: senderNewBalance,
        transactions: senderNewTransactions
      })
      .eq('email', senderEmail);
      
    if (senderUpdateError) {
      throw new Error(senderUpdateError.message);
    }
    
    // Lock receiver's row for update
    const { data: receiverData, error: receiverError } = await supabase
      .from('balance')
      .select('balance, transactions')
      .eq('email', receiverEmail)
      .single();
      
    if (receiverError) {
      throw new Error(receiverError.message);
    }
    
    if (!receiverData) {
      return { success: false, error: `User with email ${receiverEmail} not found` };
    }
    
    // Update receiver's balance and transactions
    const receiverNewBalance = receiverData.balance + amount;
    // create an receiverNewTransactions object

    const receivertransction:Transaction = {
      to: senderEmail,
      from: receiverEmail,
      amount: amount,
    }


    const receiverNewTransactions = [
      ...receiverData.transactions,
      receivertransction
    ]
    
    // Update receiver's record in database
    const { error: receiverUpdateError } = await supabase
      .from('balance')
      .update({
        balance: receiverNewBalance,
        transactions: receiverNewTransactions
      })
      .eq('email', receiverEmail);
      
    if (receiverUpdateError) {
      throw new Error(receiverUpdateError.message);
    }

    return { success: true };
    
  } catch {
    return { success: false, error: 'An error occurred'};
  }
}

async function getBalance(email: string): Promise<number> {
    // Initialize Supabase client
    
    try {
        const { data, error } = await supabase
        .from('balance')
        .select('balance')
        .eq('email', email)
        .single();
        
        if (error) {
        throw new Error(error.message);
        }
        
        if (!data) {
        throw new Error(`User with email ${email} not found`);
        }
        
        return data.balance;
    } catch (error) {
        throw error;
    }
}

async function getTransactions(email: string): Promise<Transaction[]> {
    // Initialize Supabase client
    
    try {
        const { data, error } = await supabase
        .from('balance')
        .select('transactions')
        .eq('email', email)
        .single();
        console.log(data);
        console.log('here')
        if (error) {
        throw new Error(error.message);
        }
        
        if (!data) {
        throw new Error(`User with email ${email} not found`);
        }
        
        return data.transactions;
    } catch (error) {
        throw error;
    }
}

async function initdb(email:string) {
    console.log("initdb");
    console.log(email);
try{
    //cjeck if the row exists
    const { data , error } = await supabase.from('balance').select('email').eq('email', email)
    if(data?.length != 0){
        console.log("data is not undefined");
        return null;
    }

    const { error: insertError } = await supabase
    .from('balance')
    .insert([{
      email: email,
      balance: 0,
      transactions: []
    }],{returning: 'minimal'});
    
  if (insertError) {
    throw new Error(insertError.message);
  }}catch(error){
    console.log(error);
  }
}

//a function to check if user email exists in the database
async function checkUser(email:string):Promise<boolean>{
    try{
        const { data , error } = await supabase.from('balance').select('email').eq('email', email)
        console.log(data);
        if(data?.length != 0){
            return true;
        }
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
}


export { transferBalance, getBalance, getTransactions, initdb, checkUser};