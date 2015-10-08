using System.Linq;
using System.Windows.Forms;
using Domain.Lab_1;

namespace Lab_1
{
    public partial class XTA : Form
    {
        private Perceptron perceptron;

        public XTA(Perceptron perceptron)
        {
            InitializeComponent();
            this.perceptron = perceptron;
            InitGrids();
        }

        private void InitGrids()
        {
            var grids = new[] {dataGridView1, dataGridView2}; //reflection
            for (int i = 0; i < Perceptron.RCount; i++)
            {
                var model = perceptron.XtaList(i).OrderBy(x => x.Number).ToList();
                var colNames = model.Select(x => x.AElementId).OrderBy(x => x).Distinct();
                var cols = colNames.Count();
                var rows = model.Count;

                for (int j = 0; j < cols; j++)
                {
                    var name = GetColName(colNames.ElementAt(j));
                    grids[i].Columns.Add(name,name);
                }

                for (int j = 0; j < rows; j++)
                {
                    var row = new DataGridViewRow();
                    row.HeaderCell.Value = model[j].XElementId.ToString();

                    grids[i].Rows.Add(row);
                }

                for (int j = 0; j < rows; j++)
                {
                    grids[i].Rows[j].Cells[GetColName(model[j].AElementId)].Value = model[j].Value.ToString();
                }
            }
        }

        private string GetColName(int j)
        {
            return string.Format("A{0}",j);
        }
    }
}
