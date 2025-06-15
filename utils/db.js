import { supabase } from './supabase';

// Database interface
const db = {
  // Expense functions
  async insertExpense(expense) {
    const { date, expense: expenseName, category, amount, sheet_name = 'default' } = expense;
    
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ date, expense: expenseName, category, amount, sheet_name }])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async getExpenses(page = 1, pageSize = 10, sheet_name = 'default') {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    console.log('Fetching expenses from database:', { from, to, page, pageSize, sheet_name }); // Debug log

    const { data, error, count } = await supabase
      .from('expenses')
      .select('*', { count: 'exact' })
      .eq('sheet_name', sheet_name)
      .order('date', { ascending: false })
      .range(from, to);
    
    console.log('Database query result:', { data, error, count }); // Debug log
    
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  },

  async getLastFiveExpenses() {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data;
  },

  async deleteLastFiveExpenses() {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .in('id', 
        supabase
          .from('expenses')
          .select('id')
          .order('created_at', { ascending: false })
          .limit(5)
      );
    
    if (error) throw error;
  },

  async updateExpense(id, expense) {
    const { date, expense: expenseName, category, amount, sheet_name = 'default' } = expense;
    
    const { data, error } = await supabase
      .from('expenses')
      .update({ date, expense: expenseName, category, amount, sheet_name })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async deleteExpense(id) {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getExpenseById(id) {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Income functions
  async insertIncome(income) {
    const { date, income: incomeName, category, amount, sheet_name = 'default' } = income;
    
    const { data, error } = await supabase
      .from('income')
      .insert([{ date, income: incomeName, category, amount, sheet_name }])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async getIncome(page = 1, pageSize = 10, sheet_name = 'default') {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('income')
      .select('*', { count: 'exact' })
      .eq('sheet_name', sheet_name)
      .order('date', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    return { data, total: count };
  },

  async getLastFiveIncome() {
    const { data, error } = await supabase
      .from('income')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data;
  },

  async deleteLastFiveIncome() {
    const { error } = await supabase
      .from('income')
      .delete()
      .in('id', 
        supabase
          .from('income')
          .select('id')
          .order('created_at', { ascending: false })
          .limit(5)
      );
    
    if (error) throw error;
  },

  async updateIncome(id, income) {
    const { date, income: incomeName, category, amount, sheet_name = 'default' } = income;
    
    const { data, error } = await supabase
      .from('income')
      .update({ date, income: incomeName, category, amount, sheet_name })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async deleteIncome(id) {
    const { error } = await supabase
      .from('income')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getIncomeById(id) {
    const { data, error } = await supabase
      .from('income')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteAllExpenses() {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .neq('id', 0);
    
    if (error) throw error;
  },

  async deleteAllIncome() {
    const { error } = await supabase
      .from('income')
      .delete()
      .neq('id', 0);
    
    if (error) throw error;
  },

  // Sheet functions
  async getSheets() {
    const { data, error } = await supabase
      .from('sheets')
      .select('*')
      .order('created_at');
    
    if (error) throw error;
    return data;
  },

  async createSheet(name) {
    const { data, error } = await supabase
      .from('sheets')
      .insert([{ name }])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async deleteSheet(name) {
    const { error } = await supabase
      .from('sheets')
      .delete()
      .eq('name', name);
    
    if (error) throw error;
  }
};

export default db; 