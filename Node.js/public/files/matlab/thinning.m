Id = imread('D:\34_d.png');
BWd = im2bw(Id, 0.5);
BWd2 = (~BWd);
figure, imshow(BWd2);
BW = bwmorph(BWd2, 'thin', Inf);
BW2 = bwmorph(BWd2, 'skel', Inf);
figure, imshow(BW);
figure, imshow(BW2);

imwrite(BW, 'D:\34_d_thin.png')
imwrite(BW2, 'D:\34_d_thin.png')