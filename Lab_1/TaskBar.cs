﻿using System.Drawing;
using System.Windows.Forms;

namespace Lab_1
{
    public partial class TaskBar : Form
    {
        public TaskBar()
        {
            InitializeComponent();
        }

        public void SetPreogessBar(int val)
        {
            progressBar1.Value = val;
        }

        public void SetLabel(string val)
        {

            label1.Text = val;
        }
    }
}
