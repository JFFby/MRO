using System;
using System.Windows.Forms;
using Domain.Lab_1;

namespace Lab_1
{
    public partial class AToL : Form
    {
        private Perceptron perceptron;

        public AToL(Perceptron perceptron)
        {
            InitializeComponent();
            this.perceptron = perceptron;
            ItnitGtid();
        }

        private void ItnitGtid()
        {
            var width = (int) Math.Floor((float)65530/perceptron.aElements.Count);
            for (int i = 0; i < perceptron.aElements.Count; i++)
            {
                var element = perceptron.aElements[i];
                var name = GetColName(element.Id);
                var column = new DataGridViewColumn()
                {
                    FillWeight = width,
                    HeaderText = name,
                    Name = name,
                    CellTemplate = new DataGridViewTextBoxCell()
                };
                dataGridView1.Columns.Add(column);

                if (i == 0)
                {
                    dataGridView1.Rows.Add(1);
                }

                dataGridView1.Rows[0].Cells[i].Value = element.L;
            }
        }

        private string GetColName(int j)
        {
            return string.Format("A{0}", j);
        }
    }
}
