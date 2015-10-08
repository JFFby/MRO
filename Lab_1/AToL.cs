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
            for (int i = 0; i < perceptron.aElements.Count; i++)
            {
                var element = perceptron.aElements[i];
                var name = GetColName(element.Id);
                dataGridView1.Columns.Add(name, name);

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
