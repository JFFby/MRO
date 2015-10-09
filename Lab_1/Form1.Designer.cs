namespace Lab_1
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.button1 = new System.Windows.Forms.Button();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.menuToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.gridsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.xToAToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.lToAToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.loadImageToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.clearPerceptronLearningToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.learningToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.loopToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.checkThisSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // pictureBox1
            // 
            this.pictureBox1.Location = new System.Drawing.Point(12, 45);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(30, 30);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 0;
            this.pictureBox1.TabStop = false;
            // 
            // button1
            // 
            this.button1.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.button1.Location = new System.Drawing.Point(687, 45);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(167, 30);
            this.button1.TabIndex = 1;
            this.button1.Text = "Переобучить";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // dataGridView1
            // 
            this.dataGridView1.AllowUserToAddRows = false;
            this.dataGridView1.AllowUserToDeleteRows = false;
            this.dataGridView1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Location = new System.Drawing.Point(9, 97);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.ReadOnly = true;
            this.dataGridView1.Size = new System.Drawing.Size(845, 481);
            this.dataGridView1.TabIndex = 2;
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.menuToolStripMenuItem,
            this.learningToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(866, 24);
            this.menuStrip1.TabIndex = 4;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // menuToolStripMenuItem
            // 
            this.menuToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.gridsToolStripMenuItem,
            this.loadImageToolStripMenuItem,
            this.clearPerceptronLearningToolStripMenuItem});
            this.menuToolStripMenuItem.Name = "menuToolStripMenuItem";
            this.menuToolStripMenuItem.Size = new System.Drawing.Size(50, 20);
            this.menuToolStripMenuItem.Text = "Menu";
            // 
            // gridsToolStripMenuItem
            // 
            this.gridsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.xToAToolStripMenuItem,
            this.lToAToolStripMenuItem});
            this.gridsToolStripMenuItem.Name = "gridsToolStripMenuItem";
            this.gridsToolStripMenuItem.Size = new System.Drawing.Size(211, 22);
            this.gridsToolStripMenuItem.Text = "Grids";
            // 
            // xToAToolStripMenuItem
            // 
            this.xToAToolStripMenuItem.Name = "xToAToolStripMenuItem";
            this.xToAToolStripMenuItem.Size = new System.Drawing.Size(106, 22);
            this.xToAToolStripMenuItem.Text = "X to A";
            this.xToAToolStripMenuItem.Click += new System.EventHandler(this.xToAToolStripMenuItem_Click_1);
            // 
            // lToAToolStripMenuItem
            // 
            this.lToAToolStripMenuItem.Name = "lToAToolStripMenuItem";
            this.lToAToolStripMenuItem.Size = new System.Drawing.Size(106, 22);
            this.lToAToolStripMenuItem.Text = "L to A";
            this.lToAToolStripMenuItem.Click += new System.EventHandler(this.lToAToolStripMenuItem_Click);
            // 
            // loadImageToolStripMenuItem
            // 
            this.loadImageToolStripMenuItem.Name = "loadImageToolStripMenuItem";
            this.loadImageToolStripMenuItem.Size = new System.Drawing.Size(211, 22);
            this.loadImageToolStripMenuItem.Text = "LoadImage";
            this.loadImageToolStripMenuItem.Click += new System.EventHandler(this.loadImageToolStripMenuItem_Click);
            // 
            // clearPerceptronLearningToolStripMenuItem
            // 
            this.clearPerceptronLearningToolStripMenuItem.Name = "clearPerceptronLearningToolStripMenuItem";
            this.clearPerceptronLearningToolStripMenuItem.Size = new System.Drawing.Size(211, 22);
            this.clearPerceptronLearningToolStripMenuItem.Text = "Clear Perceptron Learning";
            this.clearPerceptronLearningToolStripMenuItem.Click += new System.EventHandler(this.clearPerceptronLearningToolStripMenuItem_Click);
            // 
            // learningToolStripMenuItem
            // 
            this.learningToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.loopToolStripMenuItem,
            this.checkThisSettingsToolStripMenuItem});
            this.learningToolStripMenuItem.Name = "learningToolStripMenuItem";
            this.learningToolStripMenuItem.Size = new System.Drawing.Size(65, 20);
            this.learningToolStripMenuItem.Text = "Learning";
            // 
            // loopToolStripMenuItem
            // 
            this.loopToolStripMenuItem.Name = "loopToolStripMenuItem";
            this.loopToolStripMenuItem.Size = new System.Drawing.Size(152, 22);
            this.loopToolStripMenuItem.Text = "Loop";
            this.loopToolStripMenuItem.Click += new System.EventHandler(this.loopToolStripMenuItem_Click);
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            // 
            // checkThisSettingsToolStripMenuItem
            // 
            this.checkThisSettingsToolStripMenuItem.Name = "checkThisSettingsToolStripMenuItem";
            this.checkThisSettingsToolStripMenuItem.Size = new System.Drawing.Size(177, 22);
            this.checkThisSettingsToolStripMenuItem.Text = "Check This Settings";
            this.checkThisSettingsToolStripMenuItem.Click += new System.EventHandler(this.checkThisSettingsToolStripMenuItem_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(866, 590);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Form1";
            this.Text = "Form1";
            this.Resize += new System.EventHandler(this.Form1_Resize);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem menuToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem gridsToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem xToAToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem lToAToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem loadImageToolStripMenuItem;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.ToolStripMenuItem clearPerceptronLearningToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem learningToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem loopToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem checkThisSettingsToolStripMenuItem;
    }
}

