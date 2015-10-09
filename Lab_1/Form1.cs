using System;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using Domain.Lab_1;
using Domain.Lab_1.Enums;

namespace Lab_1
{
    public partial class Form1 : Form
    {
        private readonly Perceptron perceptron;
        private readonly CustomImageHendler imgHendler;
        private TaskBar tb;

        private int Lenght { get { return (int)Math.Sqrt(Perceptron.XCount); } }

        public Form1()
        {
            InitializeComponent();
            var watch = new Stopwatch();
            watch.Start();
            perceptron = new Perceptron(Config.CountOfRElements, 90, 225);
            InitializeGrid();
            imgHendler = new CustomImageHendler(Config.ImgFolder,
                (b, c) => new CustomImage<ClassType>(b, c));
            watch.Stop();
            this.Text = string.Format("{0} | {1}", "DarkProgramming", watch.ElapsedMilliseconds);
        }

        private void StartPerceptronLearning()
        {
            var watch = new Stopwatch();
            watch.Start();
            var result = perceptron.Learninig(imgHendler.GetImgImagesForLeaening());
            watch.Stop();
            MessageBox.Show("Обачение закнчено! (" + watch.ElapsedMilliseconds + ")" + result);
        }

        private void InitializeGrid()
        {
            for (int i = 0; i < Lenght; i++)
            {
                var j = i + 1;
                dataGridView1.Columns.Add(j.ToString(), j.ToString());
            }

            dataGridView1.Rows.Add(Lenght);
            UpdateGridWidth();
        }

        private void UpdateGridWidth()
        {
            var colWidth = (dataGridView1.Width - 30) / dataGridView1.ColumnCount;
            var colHeght = (dataGridView1.Height - 30) / dataGridView1.RowCount;

            for (int i = 0; i < dataGridView1.ColumnCount; i++)
            {
                DataGridViewColumn col = dataGridView1.Columns[i];
                DataGridViewRow row = dataGridView1.Rows[i];
                col.Width = colWidth;
                row.Height = colHeght;
            }
        }

        private void Form1_Resize(object sender, EventArgs e)
        {
            UpdateGridWidth();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            StartPerceptronLearning();
        }

        private void SetImage(CustomImage<ClassType> img)
        {
            if (img != null)
            {
                var watch = new Stopwatch();
                watch.Start();
                for (int i = 0; i < Lenght; i++)
                {
                    for (int j = 0; j < Lenght; j++)
                    {
                        var val = img.PixelValue(i, j);
                        dataGridView1.Rows[i].Cells[j].Value = val;

                        if (val == 1)
                        {
                            dataGridView1.Rows[i].Cells[j].Style.BackColor = Color.DarkSeaGreen;
                        }
                        else
                        {
                            dataGridView1.Rows[i].Cells[j].Style.BackColor = Color.White;
                        }
                    }
                }
                watch.Stop();
            }
        }

        private void xToAToolStripMenuItem_Click_1(object sender, EventArgs e)
        {
            var form = new XTA(perceptron);
            form.Show();
        }

        private void lToAToolStripMenuItem_Click(object sender, EventArgs e)
        {
            var form = new AToL(perceptron);
            form.Show();

        }

        private void loadImageToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                var watc = new Stopwatch();
                watc.Start();
                var img = new CustomImage<ClassType>(Image.FromFile(openFileDialog1.FileName) as Bitmap, ClassType.One);
                SetImage(img);
                var classType = perceptron.DefineImage(img);
                watc.Stop();
                MessageBox.Show(classType + " " + watc.ElapsedMilliseconds);
            }
        }

        private void clearPerceptronLearningToolStripMenuItem_Click(object sender, EventArgs e)
        {
            perceptron.ClearMemory();
            MessageBox.Show("Done");
        }

        private async void loopToolStripMenuItem_Click(object sender, EventArgs e)
        {
            tb = new TaskBar();
            var watc = new Stopwatch();
            watc.Start();
            tb.Show();
            var stringProgress = new Progress<string>(x => tb.SetLabel(x));
            var intPtrogress = new Progress<int>(x => tb.SetPreogessBar(x));
            var result =
                await
                    Task<string>.Factory.StartNew(
                        () => perceptron.LearningLoop(imgHendler.GetImgImagesForLeaening, stringProgress, intPtrogress),
                        TaskCreationOptions.LongRunning);
            tb.Close();
            watc.Stop();
            MessageBox.Show(result + " (" + watc.Elapsed + ")");
        }

        private void checkThisSettingsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            MessageBox.Show(perceptron.ResultEvaluation(imgHendler.GetImgImagesForLeaening().GroupBy(x => x.Class).ToDictionary(x => x.Key, y => y.ToList())));
        }
    }
}